// @ts-ignore
// TODO: need to set proper type for each param
export const validatePassengersForm = (
  adult: any = [],
  children: any = [],
  infants: any = [],
  gstInformation: any,
  contactDetails: any
) => {
  let passengersDetailsFailed = false;
  let gstInfoFailed = validateGstForm(gstInformation);
  let contactDetailsFailed = validateContactForm(contactDetails);
  for (let i = 0; i < adult.length; i++) {
    let passengerDetail = adult[i];
    // @ts-ignore
    if (passengerDetail.error) {
      passengersDetailsFailed = true;
      break;
    }
  }
  if (!passengersDetailsFailed) {
    for (let i = 0; i < children.length; i++) {
      let passengerDetail = children[i];
      // @ts-ignore
      if (passengerDetail.error) {
        passengersDetailsFailed = true;
        break;
      }
    }
  }
  if (!passengersDetailsFailed) {
    for (let i = 0; i < infants.length; i++) {
      let passengerDetail = infants[i];
      // @ts-ignore
      if (passengerDetail.error) {
        passengersDetailsFailed = true;
        break;
      }
    }
  }

  return {
    passengersDetailsFailed,
    gstInfoFailed,
    contactDetailsFailed,
  };
};

export const isValidEmail = (email: string) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  return regex.test(email);
};

export const validateContactForm = (contactDetails: any) => {
  let contactDetailsFailed = false;
  if (
    !contactDetails?.countryCode?.trim() || contactDetails?.phoneNumber?.trim()?.length !== 10 ||
    !contactDetails?.email?.trim() || !isValidEmail(contactDetails?.email?.trim())
  ) {
    contactDetailsFailed = true;
  }
  return contactDetailsFailed;
};

export const validateGstForm = (gstInformation: any) => {
  let gstInfoFailed = false;
  if (gstInformation?.useGst) {
    gstInfoFailed =
      !gstInformation.companyName?.trim() || !gstInformation.gstNumber?.trim();
  }
  return gstInfoFailed;
};
