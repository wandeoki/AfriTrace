import {
    ProductCreated,
    SupplyChainUpdated,
    ProductCertified,
    DisputeCreated,
    DisputeResolved,
    CarbonOffseted
  } from "./generated/Afritrace/Afritrace"
  import { Product, SupplyChainStep, Dispute, CarbonOffset, User } from "./generated/schema"
  import { BigInt, Bytes } from "@graphprotocol/graph-ts"
  
  export function handleProductCreated(event: ProductCreated):void {
    let product = new Product(event.params.tokenId.toString())
    product.name = event.params.name
    product.producer = event.params.producer
    product.timestamp = event.block.timestamp
    product.isCertified = false
    product.save()
  
    let user = User.load(Bytes.fromHexString(event.params.producer.toHexString()))
    if (!user) {
      user = new User(Bytes.fromHexString(event.params.producer.toHexString()))
      user.carbonCredits = BigInt.fromI32(0)
      user.save()
    }
  }
  
  export function handleSupplyChainUpdated(event:SupplyChainUpdated):void{
    let id =  event.params.tokenId.toString() + "-" + event.block.timestamp.toString()
    let step = new SupplyChainStep(id)
    step.product = event.params.tokenId.toString()
    step.stakeholder = event.params.stakeholder
    step.location = event.params.location
    step.timestamp = event.block.timestamp
    step.save()
  }
  
  export function handleProductCertified(event: ProductCertified) :void{
    let product = Product.load(event.params.tokenId.toString())
    if (product) {
      product.isCertified = true
      product.save()
    }
  }
  
  export function handleDisputeCreated(event: DisputeCreated): void {
    let dispute = new Dispute(event.params.disputeId.toString())
    dispute.product = event.params.productId.toString()
    dispute.initiator = event.params.initiator
    dispute.resolved = false
    dispute.save()
  }
  
  export function handleDisputeResolved(event: DisputeResolved):void {
    let dispute = Dispute.load(event.params.disputeId.toString())
    if (dispute) {
      dispute.resolved = true
      dispute.resolution = event.params.resolution
      dispute.save()
    }
  }
  
  export function handleCarbonOffseted(event: CarbonOffseted): void {
    let offsetId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let offset = new CarbonOffset(offsetId)
    offset.user = event.params.user
    offset.amount = event.params.amount
    offset.timestamp = event.block.timestamp
    offset.save()
  
    let user = User.load(Bytes.fromHexString(event.params.user.toHexString()))
    if (user) {
      user.carbonCredits = user.carbonCredits.plus(event.params.amount)
      user.save()
    }
  }