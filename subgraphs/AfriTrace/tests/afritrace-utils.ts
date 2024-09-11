import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  CarbonOffseted,
  DisputeCreated,
  DisputeResolved,
  ProductCertified,
  ProductCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SupplyChainUpdated,
  Transfer
} from "../generated/Afritrace/Afritrace"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCarbonOffsetedEvent(
  user: Address,
  amount: BigInt
): CarbonOffseted {
  let carbonOffsetedEvent = changetype<CarbonOffseted>(newMockEvent())

  carbonOffsetedEvent.parameters = new Array()

  carbonOffsetedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  carbonOffsetedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return carbonOffsetedEvent
}

export function createDisputeCreatedEvent(
  disputeId: BigInt,
  productId: BigInt,
  initiator: Address
): DisputeCreated {
  let disputeCreatedEvent = changetype<DisputeCreated>(newMockEvent())

  disputeCreatedEvent.parameters = new Array()

  disputeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "disputeId",
      ethereum.Value.fromUnsignedBigInt(disputeId)
    )
  )
  disputeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "productId",
      ethereum.Value.fromUnsignedBigInt(productId)
    )
  )
  disputeCreatedEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )

  return disputeCreatedEvent
}

export function createDisputeResolvedEvent(
  disputeId: BigInt,
  resolution: string
): DisputeResolved {
  let disputeResolvedEvent = changetype<DisputeResolved>(newMockEvent())

  disputeResolvedEvent.parameters = new Array()

  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "disputeId",
      ethereum.Value.fromUnsignedBigInt(disputeId)
    )
  )
  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam("resolution", ethereum.Value.fromString(resolution))
  )

  return disputeResolvedEvent
}

export function createProductCertifiedEvent(
  tokenId: BigInt,
  certifier: Address
): ProductCertified {
  let productCertifiedEvent = changetype<ProductCertified>(newMockEvent())

  productCertifiedEvent.parameters = new Array()

  productCertifiedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  productCertifiedEvent.parameters.push(
    new ethereum.EventParam("certifier", ethereum.Value.fromAddress(certifier))
  )

  return productCertifiedEvent
}

export function createProductCreatedEvent(
  tokenId: BigInt,
  name: string,
  producer: Address
): ProductCreated {
  let productCreatedEvent = changetype<ProductCreated>(newMockEvent())

  productCreatedEvent.parameters = new Array()

  productCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  productCreatedEvent.parameters.push(
    new ethereum.EventParam("producer", ethereum.Value.fromAddress(producer))
  )

  return productCreatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSupplyChainUpdatedEvent(
  tokenId: BigInt,
  stakeholder: Address,
  location: string
): SupplyChainUpdated {
  let supplyChainUpdatedEvent = changetype<SupplyChainUpdated>(newMockEvent())

  supplyChainUpdatedEvent.parameters = new Array()

  supplyChainUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  supplyChainUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "stakeholder",
      ethereum.Value.fromAddress(stakeholder)
    )
  )
  supplyChainUpdatedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )

  return supplyChainUpdatedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
