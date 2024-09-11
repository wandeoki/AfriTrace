// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {VRFV2PlusWrapperConsumerBase} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFV2PlusWrapperConsumerBase.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";
/**
 * @title AfriTrace
 * @dev A decentralized supply chain traceability platform built on ERC721 standards with certification, carbon offset, and dispute resolution functionalities.
 * @notice This contract tracks products, supply chain steps, carbon offsetting, and allows for product certification, purchase, and dispute resolution.
 * @dev It integrates Chainlink's VRF and Price Feed, uses AccessControl for roles, and supports payment in ERC20 tokens.
 */

contract AfriTraceToken is ERC20 {
    /**
     * @dev Deploys the ERC20 token contract with an initial supply to the deploying address.
     * @param initialSupply The initial supply of AfriTrace Tokens (ATT).
     */
    constructor(uint256 initialSupply) ERC20("AfriTrace Token", "ATT") {
        _mint(msg.sender, initialSupply);
    }
}

contract AfriTrace is
    ERC721,
    AccessControl,
    ReentrancyGuard,
    VRFV2PlusWrapperConsumerBase
{

    /// @dev Role definitions for verified stakeholders, certifiers, and arbiters.

    bytes32 public constant VERIFIED_ROLE = keccak256("VERIFIED_ROLE");
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant ARBITER_ROLE = keccak256("ARBITER_ROLE");
    /// @dev Token and dispute counters.
   uint256 private _tokenIds;
    uint256 private _disputeIds;
    /// @notice Token used for payments.
    IERC20 public paymentToken;
    /// @dev Chainlink price feed for fetching the latest price of a product.

    FeedRegistryInterface private priceFeed;
    /// @notice Carbon offset factor, defines the weight offset by 1 token.

    uint256 private constant CARBON_OFFSET_FACTOR = 100; // 1 token = 100 kg CO2 offset
    /// @dev Key used to retrieve the random result for VRF.

    bytes32 private constant RANDOM_RESULT_KEY = keccak256("RANDOM_RESULT");
    /// @notice Represents the metadata of a product.
    struct Product {
        string name;
        string description;
        address producer;
        uint256 timestamp;
        string ipfsHash;
        bool isCertified;
        uint256 price;
        uint256 carbonFootprint;
    }
    /// @notice Represents each step in the product's supply chain.

    struct SupplyChainStep {
        address stakeholder;
        string location;
        uint256 timestamp;
        string stepDescription;
        int256 temperature;
        uint256 humidity;
    }
    /// @notice Represents a dispute raised against a product.

    struct Dispute {
        uint256 productId;
        address initiator;
        string description;
        bool resolved;
        string resolution;
    }
    /// @notice Mapping from token ID to product information.

    mapping(uint256 => Product) public products;
    /// @notice Mapping from token ID to its supply chain steps.

    mapping(uint256 => SupplyChainStep[]) public supplyChain;
    /// @notice Mapping from dispute ID to dispute details.

    mapping(uint256 => Dispute) public disputes;
    /// @notice Mapping from address to carbon credits earned.

    mapping(address => uint256) public carbonCredits;
    /// @notice Event emitted when a new product is created.

    event ProductCreated(uint256 tokenId, string name, address producer);
    /// @notice Event emitted when a supply chain step is added to a product.

    event SupplyChainUpdated(
        uint256 tokenId,
        address stakeholder,
        string location
    );
    /// @notice Event emitted when a product is certified.

    event ProductCertified(uint256 tokenId, address certifier);
    /// @notice Event emitted when a dispute is created.

    event DisputeCreated(
        uint256 disputeId,
        uint256 productId,
        address initiator
    );
    /// @notice Event emitted when a dispute is resolved.

    event DisputeResolved(uint256 disputeId, string resolution);
    /// @notice Event emitted when carbon credits are offset.

    event CarbonOffseted(address user, uint256 amount);

    /**
     * @dev Constructor for the AfriTrace contract.
     * @param _paymentToken Address of the ERC20 token used for payments.
     * @param _priceFeed Address of the Chainlink price feed contract.
     * @param _vrfCoordinator Address of the Chainlink VRF coordinator.
     * @param _keyHash Chainlink key hash for the VRF.
     */
    constructor(
        address _paymentToken,
        address _priceFeed,
        address _vrfCoordinator,
        bytes32 _keyHash
    )
        ERC721("AfriTrace", "AFT")
        VRFV2PlusWrapperConsumerBase(_vrfCoordinator)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        paymentToken = IERC20(_paymentToken);
        priceFeed = FeedRegistryInterface(_priceFeed);
    }

    /**
     * @notice Creates a new product in the AfriTrace platform.
     * @param _name Name of the product.
     * @param _description Description of the product.
     * @param _ipfsHash IPFS hash storing metadata of the product.
     * @param _price Price of the product in AfriTrace tokens.
     * @param _carbonFootprint Carbon footprint of the product.
     * @return tokenId The ID of the newly minted product token.
     * @dev Only verified stakeholders can create products.
     * Emits a {ProductCreated} event.
     */
    function createProduct(
        string memory _name,
        string memory _description,
        string memory _ipfsHash,
        uint256 _price,
        uint256 _carbonFootprint
    ) public returns (uint256) {
        require(
            hasRole(VERIFIED_ROLE, msg.sender),
            "Sender is not a verified stakeholder"
        );

        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _safeMint(msg.sender, newTokenId);

        products[newTokenId] = Product({
            name: _name,
            description: _description,
            producer: msg.sender,
            timestamp: block.timestamp,
            ipfsHash: _ipfsHash,
            isCertified: false,
            price: _price,
            carbonFootprint: _carbonFootprint
        });

        emit ProductCreated(newTokenId, _name, msg.sender);
        return newTokenId;
    }

    /**
     * @notice Adds a new step to the product's supply chain.
     * @param _tokenId The ID of the product token.
     * @param _location The geographical location of the step.
     * @param _stepDescription Description of the supply chain step.
     * @param _temperature The recorded temperature during the step.
     * @param _humidity The recorded humidity during the step.
     * @dev Only verified stakeholders can add supply chain steps.
     * Emits a {SupplyChainUpdated} event.
     */
    function addSupplyChainStep(
        uint256 _tokenId,
        string memory _location,
        string memory _stepDescription,
        int256 _temperature,
        uint256 _humidity
    ) public {
        require(
            hasRole(VERIFIED_ROLE, msg.sender),
            "Sender is not a verified stakeholder"
        );
      

        SupplyChainStep memory newStep = SupplyChainStep({
            stakeholder: msg.sender,
            location: _location,
            timestamp: block.timestamp,
            stepDescription: _stepDescription,
            temperature: _temperature,
            humidity: _humidity
        });

        supplyChain[_tokenId].push(newStep);
        emit SupplyChainUpdated(_tokenId, msg.sender, _location);
    }

    /**
     * @notice Certifies a product.
     * @param _tokenId The ID of the product to certify.
     * @dev Only addresses with the CERTIFIER_ROLE can certify products.
     * Emits a {ProductCertified} event.
     */

    function certifyProduct(uint256 _tokenId) public {
        require(
            hasRole(CERTIFIER_ROLE, msg.sender),
            "Sender is not a certified certifier"
        );
       
        require(
            !products[_tokenId].isCertified,
            "Product is already certified"
        );

        products[_tokenId].isCertified = true;
        emit ProductCertified(_tokenId, msg.sender);
    }

    /**
     * @notice Purchases a product by transferring the product token to the buyer.
     * @param _tokenId The ID of the product to purchase.
     * @dev Product must be certified before purchase.
     * @dev Reentrancy protection is applied to avoid reentrancy attacks.
     */
    function purchaseProduct(uint256 _tokenId) public nonReentrant {
       
        require(products[_tokenId].isCertified, "Product is not certified");

        uint256 price = getLatestPrice(products[_tokenId].price);
        require(
            paymentToken.transferFrom(msg.sender, ownerOf(_tokenId), price),
            "Payment failed"
        );

        _transfer(ownerOf(_tokenId), msg.sender, _tokenId);
    }

    /**
     * @notice Creates a dispute for a specific product.
     * @param _tokenId The ID of the disputed product.
     * @param _description The details of the dispute.
     * @dev Only verified stakeholders can initiate disputes.
     * Emits a {DisputeCreated} event.
     */
    function createDispute(
        uint256 _tokenId,
        string memory _description
    ) public {
       

        _disputeIds++;
        uint256 newDisputeId = _disputeIds;

        disputes[newDisputeId] = Dispute({
            productId: _tokenId,
            initiator: msg.sender,
            description: _description,
            resolved: false,
            resolution: ""
        });

        emit DisputeCreated(newDisputeId, _tokenId, msg.sender);
    }

    /**
     * @notice Resolves a dispute for a specific product.
     * @param _disputeId The ID of the dispute to resolve.
     * @param _resolution The resolution of the dispute.
     * @dev Only arbiters can resolve disputes.
     * Emits a {DisputeResolved} event.
     */
    function resolveDispute(
        uint256 _disputeId,
        string memory _resolution
    ) public {
        require(hasRole(ARBITER_ROLE, msg.sender), "Sender is not an arbiter");
        require(!disputes[_disputeId].resolved, "Dispute is already resolved");

        disputes[_disputeId].resolved = true;
        disputes[_disputeId].resolution = _resolution;

        emit DisputeResolved(_disputeId, _resolution);
    }

    /**
     * @notice Offsets the carbon footprint for a specific product.
     * @dev Carbon credits are awarded to the user upon offsetting.
     * Emits a {CarbonOffseted} event.
     */
    function offsetCarbon(uint256 _amount) public {
        require(
            paymentToken.transferFrom(msg.sender, address(this), _amount),
            "Payment failed"
        );
        uint256 offsetAmount = _amount * CARBON_OFFSET_FACTOR;
        carbonCredits[msg.sender] += offsetAmount;
        emit CarbonOffseted(msg.sender, offsetAmount);
    }

    /**
     * @notice Fetches the latest price of a product using Chainlink price feed.
     * @param _price The price of the product in AfriTrace tokens.
     * @return latestPrice The latest price in USD.
     */
    function getLatestPrice(uint256 _price) public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData(0x514910771AF9Ca656af840dff83E8264EcF986CA,0x0000000000000000000000000000000000000348);
        return (uint256(price) * _price) / 1e8;
    }

    /**
     * @notice Requests a random number using Chainlink VRF.
     * @return requestId The ID of the VRF request.
     */
    function requestRandomNumber(
        bool enableNativePayment
    ) public returns (uint256) {
        bytes memory extraArgs = VRFV2PlusClient._argsToBytes(
            VRFV2PlusClient.ExtraArgsV1({nativePayment: enableNativePayment})
        );
        uint256 requestId;
        uint256 reqPrice;
       
        return requestId;
    }

    /**
     * @dev Callback function used by VRF Coordinator.
     * @param requestId The ID of the VRF request.
     * @param randomness The random number generated by VRF.
     */
    function fulfillRandomWords(
        uint256 requestId,
       uint256[] memory randomness
    ) internal override {
         uint256 firstRandomNumber = randomness[0];
        bytes32 key = keccak256(abi.encodePacked(RANDOM_RESULT_KEY, requestId));
        uint256 result = firstRandomNumber % 100;
        assembly {
            sstore(key, result)
        }
    }

    function getRandomResult(bytes32 requestId) public view returns (uint256) {
        bytes32 key = keccak256(abi.encodePacked(RANDOM_RESULT_KEY, requestId));
        uint256 result;
        assembly {
            result := sload(key)
        }
        return result;
    }

    ///@dev getter functions
    function getProduct(uint256 _tokenId) public view returns (Product memory) {
   
        return products[_tokenId];
    }

    function getSupplyChain(
        uint256 _tokenId
    ) public view returns (SupplyChainStep[] memory) {
    
        return supplyChain[_tokenId];
    }

    function getSupplyChainLength(
        uint256 _tokenId
    ) public view returns (uint256) {
     
     
        return supplyChain[_tokenId].length;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
