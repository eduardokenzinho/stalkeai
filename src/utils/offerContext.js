export const OFFER_VARIANTS = {
  DEFAULT: 'default',
  OFFER_01: 'offer_01'
};

const OFFER_STORAGE_KEY = 'stalkea_offer_variant';

const CHECKOUT_URLS = {
  [OFFER_VARIANTS.DEFAULT]: 'https://pay.conexaosaque.online/6YQPgjWlkeL3pxz',
  [OFFER_VARIANTS.OFFER_01]: 'https://pay.conexaosaque.online/6YQPgjWlkeL3pxz'
};

export function setOfferVariant(offerVariant = OFFER_VARIANTS.DEFAULT) {
  if (offerVariant === OFFER_VARIANTS.OFFER_01) {
    sessionStorage.setItem(OFFER_STORAGE_KEY, offerVariant);
    return;
  }

  sessionStorage.removeItem(OFFER_STORAGE_KEY);
}

export function getOfferVariant() {
  return sessionStorage.getItem(OFFER_STORAGE_KEY) || OFFER_VARIANTS.DEFAULT;
}

export function getCheckoutUrl(offerVariant = getOfferVariant()) {
  return CHECKOUT_URLS[offerVariant] || CHECKOUT_URLS[OFFER_VARIANTS.DEFAULT];
}
