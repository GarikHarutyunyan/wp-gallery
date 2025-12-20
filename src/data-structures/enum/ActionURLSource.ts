export enum ActionURLSource {
  ACTIONURL = 'action_url',
  ITEMURL = 'item_url',
  CHECKOUTURL = 'checkout_url',
}

export const ActionURLSourceOptions = [
  {value: ActionURLSource.ACTIONURL, title: 'Action URL'},
  {value: ActionURLSource.ITEMURL, title: 'Item URL'},
  {value: ActionURLSource.CHECKOUTURL, title: 'Add to Cart'},
];
