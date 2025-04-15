import React, {useEffect, useState} from "react";
import FlightDetail from "../../components/flight-detail";
import FareSummary from "../../components/fare-summary";
import TravellerForm, {ErrorMessage, FieldName, InputField,} from "../../components/traveler-form";
import Accordion from "../../components/accordion";
import SelectField from "../../components/select";
import SeatSelectionComponent from "../../components/SeatSelectionComponent";
import {connect} from "react-redux";
import {
  addAddon,
  addPassenger,
  initPassengersForm,
  removeAddon,
  removePassenger,
  removeSeletedSeats,
  setPassengerDetails,
  setSeletedSeats,
  updateContactData,
  updateGstData,
} from "../../redux/actions/passengersDetailActions";
import data from "../../public/data.json";
import Router from "next/router";
import {validateContactForm, validateGstForm, validatePassengersForm,} from "../../utils/formValidators";
import DropDown from "../../components/dropdown";
import Login from "../../components/login";
import {Modal} from "@mui/material";
import Signup from "../../components/signup";
import {ReviewDetailsStateProps,} from "../../interfaces/review-details-props";
import {NextPage} from "next";
import {Store} from "../../redux/store";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../../components/image/image";
import {PassengerDetails} from "../../models/passengers-detais.model";
import FlightStatusDetails from "../../redux/flight-status-details.service";
import AddonsService from "../../services/addons.service";
import {SeatDetails} from "../../models/seat-details.model";
import SeatDetailsService from "../../services/seat-details.service";

const mapDispatchToProps = {
  initPassengersForm,
  setPassengerDetails,
  updateGstData,
  updateContactData,
  addPassenger,
  removePassenger,
  setSeletedSeats,
  removeSeletedSeats,
  addAddon,
  removeAddon,
};
type DispatchProps = typeof mapDispatchToProps;

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const GstInfoForm = (props: {
  formSubmitted?: boolean;
  updateGstData: ({}) => void;
  data: { useGst: boolean; gstNumber: string; companyName: string };
}) => {
  let [useGst, setUseGst] = useState(props.data.useGst);
  let [gstNumber, setGstNumber] = useState(props.data.gstNumber);
  let [companyName, setCompanyName] = useState(props.data.companyName);
  const updateData = (changedValue = {}) => {
    props.updateGstData(
      Object.assign(
        {
          useGst,
          gstNumber,
          companyName,
        },
        changedValue
      )
    );
  };
  const onUseGstChange = (id: string, value: boolean) => {
    setUseGst(value);
    updateData({ useGst: value });
  };
  const onGstNoChange = (value: string) => {
    setGstNumber(value);
    updateData({ gstNumber: value });
  };
  const onCompanyNameChange = (value: string) => {
    setCompanyName(value);
    updateData({ companyName: value });
  };

  return (
    <div className="px-6 py-6 space-y-4">
      <div className="space-x-7 flex">
        <div className="flex flex-col w-4/12">
          <InputField
            error={props.formSubmitted && useGst && !gstNumber?.trim()}
            placeholder="GSTIN"
            value={gstNumber}
            onChange={onGstNoChange}
            className="!w-full"
            id={'GSTIN'}

          />
          {props.formSubmitted && useGst && !gstNumber?.trim() && (
            <ErrorMessage message={"Please enter the valid GST number"} />
          )}
        </div>
        <div className="flex flex-col w-4/12">
          <InputField
            error={props.formSubmitted && useGst && !companyName?.trim()}
            placeholder="Company Name"
            value={companyName}
            onChange={onCompanyNameChange}
            className="!w-full"
            id={'company-name'}
          />
          {props.formSubmitted && useGst && !companyName?.trim() && (
            <ErrorMessage message={"Please enter the valid Company Name"} />
          )}
        </div>
      </div>
    </div>
  );
};

const ContactDetailForm = (props: {
  formSubmitted?: boolean;
  updateContactData: ({}) => void;
  data: { countryCode: string; phoneNumber: string; email: string };
}) => {
  let [countryCode, setCountryCode] = useState(props.data.countryCode);
  let [phoneNumber, setPhoneNumber] = useState(props.data.phoneNumber);
  let [email, setEmail] = useState(props.data.email);

  const updateData = (updatedValue = {}) => {
    props.updateContactData(
      Object.assign(
        {
          countryCode,
          phoneNumber,
          email,
        },
        updatedValue
      )
    );
  };

  const onCountryCodeChange = (
    id: any,
    value: React.SetStateAction<string>
  ) => {
    setCountryCode(value);
    updateData({ countryCode: value });
  };
  const onPhoneNoChange = (value: React.SetStateAction<string>) => {
    setPhoneNumber(value);
    updateData({ phoneNumber: value });
  };
  const onEmailChange = (value: React.SetStateAction<string>) => {
    setEmail(value);
    updateData({ email: value });
  };

  return (
    <div className="px-6 py-6 space-y-4">
      <div className="text-base font-normal">
        E-ticket will be sent to this e-mail address and phone number
      </div>
      <div className="space-y-4">
        <FieldName label="Mobile Number" />
        <div className="space-x-7 flex">
          <SelectField
            placeholder="+91"
            value={countryCode}
            types={data.dialorCountryCode}
            onChange={(e) => {
              // @ts-ignore
              onCountryCodeChange(e);
            }}
            id={'country-code'}
          />
          <div className="flex flex-col w-4/12">
            <InputField
              error={props.formSubmitted && !phoneNumber?.trim() && phoneNumber.length!=10}
              type={"text"}
              value={phoneNumber}
              onChange={onPhoneNoChange}
              placeholder="Mobile Number"
              className="!w-full"
              id={'phoneNumber'}
            />
            {props.formSubmitted && (phoneNumber.length !== 10) && (
              <ErrorMessage message="Please enter the valid Contact number" />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <FieldName label="Email Address" />
        <div className="flex flex-col w-5/12">
          <InputField
            error={props.formSubmitted && !email?.trim() }
            type={"email"}
            value={email}
            onChange={onEmailChange}
            placeholder="Email Address"
            className="!w-full"
            id={'email-address'}
          />
          {props.formSubmitted && !isValidEmail(email) && (
              <ErrorMessage message="Please enter a valid email address." />
          )}
        </div>
      </div>
    </div>
  );
};

const AddonCard = (props: {
  header: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <div className="shadow-cards overflow-hidden rounded-10 ">
      <div className="bg-yellow-light">{props.header}</div>
      <div>{props.content}</div>
    </div>
  );
};
const passengersOptions = [
  {
    name: "Adult (12y +)",
    type: "adult",
  },
  {
    name: "Children (2 - 12y)",
    type: "children",
  },
  {
    name: "Infants (Below 2y)",
    type: "infants",
  },
];
const AddPassengerOptions = (props: {
  addPassenger?: ({}) => void;
  handleClose?: () => void;
}) => {
  return (
    <ul className="py-5 space-y-5 w-full text-sm">
      {passengersOptions.map((option, i) => {
        const onClick = (event: any) => {
          // @ts-ignore
          props.handleClose && props.handleClose(event);
          props.addPassenger && props.addPassenger({ type: option.type });
        };
        return (
          <li
            key={i}
            onClick={onClick}
            className="px-5 py-2 hover:bg-primary hover:text-white !mt-0 cursor-pointer text-secondary"
            id={option.type}
          >
            {option.name}
          </li>
        );
      })}
    </ul>
  );
};

const TravellerFormHeader = (props: { addPassenger?: ({}) => void }) => {
  return (
    <div className="flex justify-between px-6 py-4 items-center">
      <span className="text-lg font-bold">Traveller Details</span>
      <DropDown
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        trigger={
          <button className="border border-primary text-sm font-bold text-primary px-11 py-1 rounded-5 hover:bg-primary hover:text-white" id={'addTravellers'}>
            + Add Traveller
          </button>
        }
        content={<AddPassengerOptions addPassenger={props.addPassenger} />}
        idName={"addTraveller"}
      />
    </div>
  );
};

const PassengerFormHeader = (props: {
  type?: string;
  index?: number;
  name: string;
  error: boolean;
  onRemove?: ({}) => void;
}) => {
  return (
    <div className="flex space-x-5 items-center">
      <div className={`text-lg font-bold${props.error ? " text-ts-red" : ""}`}>
        {props.name}
      </div>
      {props.onRemove && (
        <span
          className="text-primary text-base font-bold cursor-pointer"
          onClick={() => {
            // @ts-ignore
            props.onRemove({ type: props.type, index: props.index });
          }}
          id={'remove-'+props.type+"-"+props.index}
        >
          Remove
        </span>
      )}
    </div>
  );
};
type Props = ReviewDetailsStateProps & DispatchProps;
const ReviewDetails: NextPage<Props> = (props) => {
  let [isContactFormFilled, setIsContactFormFilled] = useState(false);
  let [isSeatSelectionDone, setIsSeatSelectionDone] = useState(false);
  let [isSeatSelectionEdit, setIsSeatSelectionEdit] = useState(false);
  let [isContactFormEdit, setContactFormEdit] = useState(true);
  let [flightCount,setFlightCount] = useState(0);

  // contact form
  let [isContactFormFailed, setContactFormFailed] = useState(false);
  let [isContactFormPassed, setContactFormPassed] = useState(false);

  let [formSubmitted, setFormSubmitStatus] = useState(false);

  let [openModal, setOpenModal] = useState(false);
  let [showSignup, setShowSignup] = useState(false);
  let [showGuest, setShowGuest] = useState(false);
  let [username, setUsername] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState();
  const [addons, setAddons] = useState<any>()
  const [removeSelectedSeat, setRemovedSelectedSeat] = useState(false)

  useEffect(() => {
    props.initPassengersForm({
      adult: props.adultCount,
      children: props.childrenCount,
      infants: props.infantsCount,
    });
    const username = sessionStorage.getItem("username");
    setUsername(username);
    AddonsService.show().then(res => {
      setAddons(res),
          console.log("res inside show of addons" + res)
    });
    setAddons(addons)
  }, [openModal]);

  const onSaveContactDetails = () => {
    // @ts-ignore
    let {passengersDetailsFailed, gstInfoFailed, contactDetailsFailed} =
        validatePassengersForm(
            props.adult,
            props.children,
            props.infants,
            props.gstInformation,
            props.contactDetails
        );
    setFormSubmitStatus(true);
    if (!passengersDetailsFailed && !gstInfoFailed && !contactDetailsFailed) {
      setContactFormEdit(false);
      setIsSeatSelectionEdit(true);
      setContactFormFailed(false);
      setContactFormPassed(true);
      setFlightCount(0);
    } else {
      setContactFormFailed(true);
      setContactFormPassed(false);
    }
  };
  const [selectedSeat, setSelectedSeat] = useState<any>([]);

  const onSaveSeatSelection = () => {
    const seatsForPassengers=[];
    if(flight.length == flightCount+1) {
      console.log("seat if equal")
      setIsSeatSelectionDone(true);
      setIsSeatSelectionEdit(false);
      // if (selectedSeat) {
      //   for (let i = 0; i < selectedSeat.length; i += props.totalPassengers) {
      //     seatsForPassengers.push(selectedSeat.slice(i, i + props.totalPassengers));
      //   }
      // }
    }
    setFlightCount(flightCount + 1);
    props.removeSeletedSeats([]);
    setRemovedSelectedSeat(!removeSelectedSeat)
    console.log("flightcount "+flightCount)
    props.setSeletedSeats({selectedSeats:[]});
    props.setSeletedSeats({selectedSeats:selectedSeat});
  };

  const onEditContactForm = () => {
    setContactFormEdit(true);
  };
  const onEditSeatSelectionForm = () => {
    setFlightCount(0);
    setIsSeatSelectionEdit(true);
    setContactFormEdit(false);
  };

  function createTimestamp(dateObj: any) {
    const { year, month, date } = dateObj;
    const newDateObj = new Date(year, month - 1, date, 0, 0, 0);
    return newDateObj.toISOString().slice(0, 19).replace('T', ' ');
  }

  const bookingRequest: any = [];
  const passengersRequests: PassengerDetails[] = [];

  const gstinfoRequest = {
    gstinNumber: parseInt(props.gstInformation.gstNumber),
    companyName: props.gstInformation.companyName
  };

  function getAddons(props: any): any {
    let addons = [];
    if (props.addons.covidInsurance.status) addons.push("COVID");
    if (props.addons.packageProtection.status) addons.push("BAGGAGE");
    if (props.addons.covidTest.status) addons.push("QUARANTINE");
    return addons;
  }


  function getTripType(tripType: number) {
    const tripTypeNum = Number(tripType);
    if (tripTypeNum === 1) {
      return "ONE_WAY";
    } else if (tripTypeNum === 2) {
      return "ROUND_TRIP";
    } else if (tripTypeNum === 3) {
      return "MULTI_TRIP";
    } else {
      return "Unknown trip type";
    }
  }


  const handleStatusSubmit = () => {
    const seatArray: any = props.selectedSeats;

    const processPassengerDetails = (passengers: any, flight: any, type: any) => {
        for (let i in passengers) {
          console.log("[Debug] i::",i,"Passenger[i] ::", passengers[i])
          const dateOfBirthFormatted = createTimestamp(passengers[i].dob);
          const expiryDateFormatted = createTimestamp(passengers[i].passport.expiryDate);
          const passengerDetails = {
            firstName: passengers[i].firstName,
            lastName: passengers[i].lastName,
            gender: passengers[i].gender,
            dateOfBirth: new Date(dateOfBirthFormatted),
            passportNumber: passengers[i].passport.number,
            issueCountry: passengers[i].passport.issueCountry,
            nationality: passengers[i].passport.nationality,
            expiryDate: new Date(expiryDateFormatted),
            travellerType: type
          };

          passengersRequests.push(passengerDetails);
        }

    };

    processPassengerDetails(props.adult, props.selectedFlightDetail, "ADULT");
    processPassengerDetails(props.children, props.selectedFlightDetail,"CHILDREN");
    processPassengerDetails(props.infants, props.selectedFlightDetail, "INFANT");
   

    if (Array.isArray(props.selectedFlightDetail) || typeof props.selectedFlightDetail === 'object') {
      const flightDetails = Array.isArray(props.selectedFlightDetail) ? props.selectedFlightDetail : [props.selectedFlightDetail];
      const Trip = Array.isArray(props.TripDetails) ? props.TripDetails : [props.TripDetails];

      for (let i = 0; i < flightDetails.length; i++) {
        const flightDetail = flightDetails[i];
        const trips = Trip.length == 1 ? Trip[0] : Trip[i]
        const journey = {
          flightId: flightDetail.id,
          email: props.contactDetails.email,
          phoneNumber: props.contactDetails.phoneNumber,
          discountCodeId: 2,
          price: 2000,
          userId: sessionStorage.getItem("id"),
          tripType: getTripType(props.tripType),
          status: "PENDING",
          departureDate: trips?.depart?.data,
          returnDate: "",
          passengerRequests: passengersRequests,
          seats:seatArray[i],
          addons: getAddons(props),
          gstinfoRequest
        };
        bookingRequest.push(journey);
      }
    }
    console.log(bookingRequest)
    console.log(props)

    FlightStatusDetails.flightStatus(bookingRequest)
        .then(res => {
          // @ts-ignore
          Router.push({pathname: "/payment", query: {id: res[0]?.id}});
        })
        .catch(error => {
          console.log(error);
        });
  }

  function AddAddon(i: number) {
    if (i == 2) {
      props.addAddon({addon: "covidTest"})
    } else if (i == 1) {
      props.addAddon({addon: "packageProtection"})
    } else if (i == 0) {
      props.addAddon({addon: "covidInsurance"})
    }
  }

  function RemoveAddon(i: number) {
    if (i == 2) {
      props.removeAddon({addon: "covidTest"})

    } else if (i == 1) {
      props.removeAddon({addon: "packageProtection"})
    } else if (i == 0) {
      props.removeAddon({addon: "covidInsurance"})
    }
  }

  function PropsSelection(i: number) {
    if (i == 0) {
      return props.addons.covidInsurance.status
    } else if (i == 1) {
      return props.addons.packageProtection.status
    } else if (i == 2) {
      return props.addons.covidTest.status
    }
  }

  const [seatData, setseatData] = useState<SeatDetails[]>([])
  const flight = Array.isArray(props.selectedFlightDetail) ? props.selectedFlightDetail : [props.selectedFlightDetail];
  const flightIds: any = [];
  for (let i = 0; i < flight.length; i++) {
    flightIds.push(flight[i]?.id);
  }
  useEffect(() => {
    let seatArray:any = [];
    const promises = flightIds.map((id:any, index:number) => {
      return SeatDetailsService.showSeatById(id).then((r) => {
        // @ts-ignore
        return r.content;
      });
    });

    Promise.all(promises).then((results) => {
      seatArray = results;
      setseatData(seatArray);
    });

  }, []);


  function setSeat(data: any) {
    setSelectedSeat((prevSelectedSeat:any) => {
      const updatedSelectedSeat = [...prevSelectedSeat];
      updatedSelectedSeat[flightCount] = data;
      return updatedSelectedSeat;
    });
  }

  return (
    <div className="sm:container m-auto -mt-40 flex space-x-6">
      <div className="flex basis-4/5 flex-col space-y-2.5 pb-8">
        <div className="bg-white rounded-10">
          <Accordion
              id={'flight-details'}
            defaultOpen={true}
            hideBorder={true}
            items={[
              {
                HeaderPortion: (
                  <div className="text-lg font-bold">Flight Details</div>
                ),
                Content: (
                  <div className="px-6 pb-6">
                    <FlightDetail flight={props.selectedFlightDetail} />
                  </div>
                ),
              },
            ]}
          />
        </div>
        {isContactFormEdit && !isSeatSelectionEdit ? (
          <div className="bg-white rounded-10">
            <TravellerFormHeader addPassenger={props.addPassenger} />
            {!username && (
              <div className="px-6 bg-grey-secondary flex items-center py-2 justify-between">
                <span className="text-sm font-normal">
                  Login to view Saved Traveller’s list, unlock coupons and much
                  more.
                </span>
                <span className="space-x-5">
                  <button
                    className="text-sm font-bold py-1 px-7 border border-primary rounded-5 text-primary hover:bg-primary hover:text-white"
                    onClick={() => setOpenModal(true)}
                    id={'login'}
                  >
                    Login
                  </button>
                  <span className="text-sm font-normal">or</span>
                  <button
                    className="text-sm font-bold py-1 px-9 border border-primary rounded-5 text-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                      setOpenModal(true);
                      setShowGuest(true);
                    }}
                    id={'continue-as-guest'}
                  >
                    Continue as Guest
                  </button>
                </span>
              </div>
            )}
            {props.adult.map((form: any, index) => {
              return (
                <Accordion
                    id={`Adult ${index + 1}`}
                  key={index}
                  items={[
                    {
                      HeaderPortion: (
                        <PassengerFormHeader
                          onRemove={
                            props.totalPassengers > 1
                              ? props.removePassenger
                              : () => {}
                          }
                          type="adult"
                          index={index}
                          name={`Adult ${index + 1} (${props.totalPassengers})`}
                          error={formSubmitted && form.error}
                        />
                      ),
                      Content: (
                        <TravellerForm
                          isSubmitted={formSubmitted}
                          data={form}
                          index={index}
                          type={"adult"}
                          setPassengerDetails={props.setPassengerDetails}
                          setPassengerDetailsError={() => {}}
                        />
                      ),
                    },
                  ]}
                />
              );
            })}
            {props.children.map((form: any, index) => {
              return (
                <Accordion
                    id={`Children ${index + 1}`}
                  key={index}
                  items={[
                    {
                      HeaderPortion: (
                        <PassengerFormHeader
                          onRemove={
                            props.totalPassengers > 1
                              ? props.removePassenger
                              : () => {}
                          }
                          type="children"
                          index={index}
                          name={`Children ${index + 1} (${
                            props.totalPassengers
                          })`}
                          error={formSubmitted && form.error}
                        />
                      ),
                      Content: (
                        <TravellerForm
                          isSubmitted={formSubmitted}
                          data={form}
                          index={index}
                          type={"children"}
                          setPassengerDetails={props.setPassengerDetails}
                          setPassengerDetailsError={() => {}}
                        />
                      ),
                    },
                  ]}
                />
              );
            })}
            {props.infants.map((form: any, index) => {
              return (
                <Accordion
                    id={`Infant ${index + 1}`}
                  key={index}
                  items={[
                    {
                      HeaderPortion: (
                        <PassengerFormHeader
                          onRemove={
                            props.totalPassengers > 1
                              ? props.removePassenger
                              : () => {}
                          }
                          type="infants"
                          index={index}
                          name={`Infant ${index + 1} (${
                            props.totalPassengers
                          })`}
                          error={formSubmitted && form.error}
                        />
                      ),
                      Content: (
                        <TravellerForm
                          isSubmitted={formSubmitted}
                          data={form}
                          index={index}
                          type={"infants"}
                          setPassengerDetails={props.setPassengerDetails}
                          setPassengerDetailsError={() => {}}
                        />
                      ),
                    },
                  ]}
                />
              );
            })}
            {/*  Static form for GST and contact details  */}
            <Accordion
                id={'GSTIN-information'}
              items={[
                {
                  HeaderPortion: (
                    <div
                      className={`text-lg font-bold${
                        formSubmitted && validateGstForm(props.gstInformation)
                          ? " text-ts-red"
                          : ""
                      }`}
                    >
                      GST Information
                    </div>
                  ),
                  Content: (
                    // @ts-ignore
                    <GstInfoForm
                      formSubmitted={formSubmitted}
                      data={props.gstInformation}
                      updateGstData={props.updateGstData}
                    />
                  ),
                },
              ]}
            />
            <Accordion
                id={'contact-details'}
              items={[
                {
                  HeaderPortion: (
                    <div
                      className={`text-lg font-bold${
                        formSubmitted &&
                        validateContactForm(props.contactDetails)
                          ? " text-ts-red"
                          : ""
                      }`}
                    >
                      Contact Details
                    </div>
                  ),
                  Content: (
                    // @ts-ignore
                    <ContactDetailForm
                      formSubmitted={formSubmitted}
                      data={props.contactDetails}
                      updateContactData={props.updateContactData}
                    />
                  ),
                },
              ]}
            />
            <div className="py-6 px-6 flex flex-col space-y-1">
              <button
                className="ts-t-primary-btn px-8 w-fit"
                onClick={onSaveContactDetails}
                id={'continue-to-select-seats'}
              >
                Continue to Select Seats
              </button>
              {isContactFormFailed && (
                <ErrorMessage message={"Please fill the missed form fields"} />
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-10">
            <div className="flex justify-between px-6 py-4 items-center">
              <span className="text-lg font-bold">Traveller Details</span>
              <button
                className="text-sm text-primary font-bold"
                onClick={onEditContactForm}
                id={'edit-details'}
              >
                Edit details
              </button>
            </div>
          </div>
        )}
        {isSeatSelectionEdit ? (
            <div className="bg-white rounded-10">
                  <Accordion
                      id={`total-passengers-${flightCount}`}
                      defaultOpen={true}
                      hideBorder={true}
                      items={[
                        {
                          HeaderPortion: (
                              <div className="text-lg font-bold">Select Details for Flight {flightCount + 1}</div>
                          ),
                          Content: (
                              <React.Fragment>
                                <SeatSelectionComponent
                                    totalPassengers={props.totalPassengers}
                                    setSeletedSeats={props.setSeletedSeats}
                                    setFlight={props.selectedFlightDetail}
                                    setData={seatData[flightCount]}
                                    setSeat={setSeat}
                                    removeSeatSelection={removeSelectedSeat}
                                />
                                <div className="py-6 px-6">
                                  <button
                                      className="ts-t-primary-btn px-8 disabled:opacity-75"
                                      disabled={
                                          props.selectedSeats.length !== props.totalPassengers
                                      }
                                      onClick={() => onSaveSeatSelection()}
                                      id={`continue-to-add-ons-${flightCount}`}
                                  >
                                    {flightCount+1 == flight.length ? `Continue to Add ons` :`Continue to next flight` }

                                  </button>
                                </div>
                              </React.Fragment>
                          ),
                        },
                      ]}
                  />
            </div>

        ) : (
          isContactFormPassed && (
            <div className="bg-white rounded-10">
              <div className="flex justify-between px-6 py-4 items-center">
                <span className="text-lg font-bold">Seat Selection</span>
                <button
                  className="text-sm text-primary font-bold"
                  onClick={onEditSeatSelectionForm}
                  id={'edit-seats'}
                >
                  Edit seats
                </button>
              </div>
            </div>
          )
        )}
        {isSeatSelectionDone && (
          <div className="bg-white rounded-10">
            <div className="flex justify-between px-6 py-4 items-center relative before:content before:absolute before:bottom-0 before:w-[96%] before:border-0.5 before:border-grey-secondary">
              <span className="text-lg font-bold">Add ons</span>
              <span
                className="text-sm text-primary cursor-pointer font-bold"
                onClick={() => {
                  Router.push({ pathname: "/payment" });
                }}
                id={'skip-add-ons'}
              >
                Skip Add ons
              </span>
            </div>
            <div className="px-6 space-y-5 my-5">
              {console.log("addonspage --"+selectedSeat)}

              {addons?.map((addon: any, i: number) => {
                return (
                    <div key={i}>
                      <AddonCard
                          header={
                            <div className="py-2.5 px-6 flex justify-between items-center">
                              <span className="text-lg font-bold">{addon.title}</span>
                              <span className="flex space-x-6 items-center">
              <span className="text-lg font-bold">$ {addon.price}</span>
              <button
                  onClick={() => {
                    PropsSelection(i)
                        ? RemoveAddon(i)
                        : AddAddon(i);
                  }}
                  className={`${
                      PropsSelection(i)
                          ? "text-primary "
                          : "bg-primary text-white "
                  }border border-primary px-5 text-xs font-bold py-1.5 rounded`}
                  id={
                    PropsSelection(i)
                        ? "Remove-package"
                        : "Add-package"
                  }
              >
                {PropsSelection(i) ? "- Remove" : "+ Add"}
              </button>
            </span>
                            </div>
                          }
                          content={
                            <div className="py-3.5 px-6 space-y-4">
                              <div className="text-sm font-normal text-secondary">
                                {addon.description}
                              </div>
                              <div className={addon.addonPolicyDTO?.length == 0 ? `flex space-x-6 justify-end`: `flex space-x-6`} >
                              {addon.addonPolicyDTO.length > 0 && (
                                  <div className={"w-full flex flex-row"}>
                                    {addon.addonPolicyDTO?.map((policy: any, j: number) => (

                                          <div key={j} className={"px-3"}>
                                            <div className="py-1 text-sm text-secondary font-bold relative before:content before:absolute before:bottom-0 before:w-2/12 before:border-0.5 before:border-grey-secondary">
                                              {policy.title}
                                            </div>
                                            <div className="py-1 text-sm text-secondary">
                                              {policy.description}
                                            </div>
                                          </div>
                                    ))}
                                  </div>
                              )}
                                <div className="flex items-end text-sm font-normal text-primary shrink-0">
                                  <span className="cursor-pointer">View benefits</span>
                                </div>
                              </div>
                            </div>
                          }
                      />
                    </div>
                );
              })}


              <div className="text-sm font-normal">
                By clicking on the Continue button below to proceed with the
                booking, I confirm that I have read and I accept the{" "}
                <span className="text-primary cursor-pointer">Fare Rules</span>{" "}
                , the{" "}
                <span className="text-primary cursor-pointer">
                  Privacy Policy
                </span>
                , the{" "}
                <span className="text-primary cursor-pointer">
                  User Agreement
                </span>{" "}
                and{" "}
                <span className="text-primary cursor-pointer">
                  Terms of Service
                </span>{" "}
                of Simply Travel.
              </div>
              <button
                className="py-1.5 px-10 bg-primary text-white rounded-5 text-lg font-bold"
                onClick={() => {
                  handleStatusSubmit();

                }}
                id={'continue-to-payment'}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex basis-1/5 flex-col">
        <div className="sticky top-10 space-y-6">
          <FareSummary
              discount={false}
            baseFare={Number(props.selectedFlightDetail?.price || 500)}
            adultCount={props.adultCount}
            childrenCount={props.childrenCount}
            infantsCount={props.infantsCount}
            addonsAmount={props.addonsAmount}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={"h-screen flex"}>
          <div
            className={`drop-shadow-xl rounded-2xl ${
              showSignup ? "signup-form" : "login-form"
            } m-auto`}
          >
            <div className="absolute right-4 top-4">
              <ImageWithAssetPrefix height={12} width={12} src={assetPrefix+"/close-icon.svg"}
                                    alt="" className="cursor-pointer"
                                    onClick={() => setOpenModal(false)}
                                    /*id={'close-svg-popup'}*/   />
            </div>
            <>
              {showSignup && !showGuest? (
                <Signup handleLoginClose={() => setOpenModal(false)} />
              ) : (
                <Login showGuest={showGuest}
                  handleLoginClose={() => setOpenModal(false)}
                  setShowSignup={() => setShowSignup(true)}
                />
              )}
            </>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: Store): ReviewDetailsStateProps => {
  const passengersAndClass = state.trip.passengersAndClass;
  const passengersDetail = state.passengersDetail;
  const adultCount = passengersAndClass.adult || 0;
  const childrenCount = passengersAndClass.children || 0;
  const infantsCount = passengersAndClass.infants || 0;
  const totalPassengers = adultCount + childrenCount + infantsCount;
  const tripType = state.trip.type;
  const TripDetail =state.trip.tripDetails
  const addons = passengersDetail?.addons;
  const addonsAmount =
    (addons.covidInsurance.status ? addons.covidInsurance.amount : 0) +
    (addons.packageProtection.status ? addons.packageProtection.amount : 0) +
    (addons.covidTest.status ? addons.covidTest.amount : 0);

  return {
    adultCount,
    childrenCount,
    infantsCount,
    totalPassengers,
    adult: passengersDetail.adult,
    children: passengersDetail.children,
    infants: passengersDetail.infants,
    gstInformation: passengersDetail.gstInformation,
    contactDetails: passengersDetail.contactDetails,
    selectedSeats: passengersDetail.selectedSeats,
    selectedFlightDetail: state.flightDetail?.selectedFlightDetail,
    addons,
    addonsAmount,
    tripType,
    TripDetails:TripDetail
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewDetails as any);
