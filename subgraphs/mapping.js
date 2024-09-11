import {
    ProductCreated,
    SupplyChainUpdated,
    ProductCertified,
    DisputeCreated,
    DisputeResolved,
    CarbonOffseted
  } from "../generated/AfriTrace/AfriTrace"
  import { Product, SupplyChainStep, Dispute, CarbonOffset, User } from "../generated/schema"
  import { BigInt } from "@graphprotocol/graph-ts"
  
  export function handleProductCreated(event) {
    let product = new Product(event.params.tokenId.toString())
    product.name = event.params.name
    product.producer = event.params.producer
    product.timestamp = event.block.timestamp
    product.isCertified = false
    product.save()
  
    let user = User.load(event.params.producer.toHexString())
    if (!user) {
      user = new User(event.params.producer.toHexString())
      user.carbonCredits = BigInt.fromI32(0)
      user.save()
    }
  }
  
  export function handleSupplyChainUpdated(event){
    let id = event.params.tokenId.toString() + "-" + event.block.timestamp.toString()
    let step = new SupplyChainStep(id)
    step.product = event.params.tokenId.toString()
    step.stakeholder = event.params.stakeholder
    step.location = event.params.location
    step.timestamp = event.block.timestamp
    step.save()
  }
  
  export function handleProductCertified(event) {
    let product = Product.load(event.params.tokenId.toString())
    if (product) {
      product.isCertified = true
      product.save()
    }
  }
  
  export function handleDisputeCreated(event) {
    let dispute = new Dispute(event.params.disputeId.toString())
    dispute.product = event.params.productId.toString()
    dispute.initiator = event.params.initiator
    dispute.resolved = false
    dispute.save()
  }
  
  export function handleDisputeResolved(event) {
    let dispute = Dispute.load(event.params.disputeId.toString())
    if (dispute) {
      dispute.resolved = true
      dispute.resolution = event.params.resolution
      dispute.save()
    }
  }
  
  export function handleCarbonOffseted(event) {
    let offset = new CarbonOffset(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
    offset.user = event.params.user
    offset.amount = event.params.amount
    offset.timestamp = event.block.timestamp
    offset.save()
  
    let user = User.load(event.params.user.toHexString())
    if (user) {
      user.carbonCredits = user.carbonCredits.plus(event.params.amount)
      user.save()
    }
  }