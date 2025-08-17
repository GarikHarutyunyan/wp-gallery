export enum ActionURLSource {
  ACTIONURL = 'actionUrl',
  ITEMURL = 'itemUrl',
  PRODUCTCHECKOUTURL = 'productCheckoutUrl',
}

export const ActionURLSourceOptions = [
  {value: ActionURLSource.ACTIONURL, title: 'Action URL'},
  {value: ActionURLSource.ITEMURL, title: 'Item URL'},
  {value: ActionURLSource.PRODUCTCHECKOUTURL, title: 'Product Checkout URL'},
];
