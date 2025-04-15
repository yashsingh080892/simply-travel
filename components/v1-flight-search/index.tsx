import React, { useEffect } from 'react';
import RadioGroup from '../radio-button-group';
import DropDown from '../dropdown';
import FlightListDropDown from '../flight-list-dropdown';
import getCurrentDateDetails from '../../utils/dateFormater';
import PassengersAndClassForm from '../passengers-classes';
import { connect } from 'react-redux';
import {
  addNewTrip,
  removeLastTrip,
  setDeparture,
  setPassengersAndClass,
  setReturnDate,
  setTripFrom,
  setTripTo,
  setTripType,
  toggleFromToLocations,
} from '../../redux/actions/tripActions';
import classNames from 'classnames';
import DatePicker from '../date-picker';
import data from '../../public/data.json';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { FlightSearchProps } from '../../interfaces/flight-search-props';
import { FlightTriggerProps } from '../../interfaces/flight-trigger';
import { HeaderLabelProps } from '../../interfaces/header-label-props';
import { assetPrefix } from '../../next.config';
import ImageWithAssetPrefix from '../image/image';
import Banner from '../../pages/v2_banner';

const SelectPlace = (props: any) => {
  return (
    <div className="h-full flex items-center justify-center">
      <span className="text-2xl text-secondary font-bold">{props.content}</span>
    </div>
  );
};

const FlightTrigger = (props: FlightTriggerProps) => {
  return (
    <React.Fragment>
      <div className={'text-2xl truncate ct_name leading-7 pr-4 font-bold'}>
        {props.cityName}
      </div>
      <div
        className={'text-base truncate ap-name leading-4 pr-4 pt-1 font-normal'}
      >
        {props.airportName}
      </div>
    </React.Fragment>
  );
};

const HeaderLabel = (props: HeaderLabelProps) => {
  return (
    <div
      className={`text-lg font-bold text-secondary pb-1.5${
        props.className ? ` ${props.className}` : ''
      }`}
    >
      {props.content}
    </div>
  );
};

const V1FlightSearch = (props: FlightSearchProps) => {
  const [myFlightData, setMyFlightData] = React.useState({
    tripTypes: [],
    tripType: '',
    cities: [],
    from: { ct_name: '', ap_name: '', host_airlines: [''] },
    to: { ct_name: '', ap_name: '', host_airlines: [''] },
    departure: getCurrentDateDetails(),
    return: '',
    passengers: 3,
    class: 'Economy',
  });
  let getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMyFlightData({
          ...myFlightData,
          tripTypes: myJson.tripTypes,
          tripType: myJson.tripTypes[0],
          from: {
            ct_name: myJson.cities[0]['ct_name'],
            ap_name: myJson.cities[0]['ap_name'],
            host_airlines: myJson.cities[0]['host_airlines'],
          },
          to: {
            ct_name: myJson.cities[1]['ct_name'],
            ap_name: myJson.cities[1]['ap_name'],
            host_airlines: myJson.cities[1]['host_airlines'],
          },
        });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const passengersCount =
    props.passengersAndClass.adult +
    props.passengersAndClass.children +
    props.passengersAndClass.infants;
  const classType = data.classes.find((_class) => {
    return _class.id === props.passengersAndClass.classType;
  })?.name;

  let isPlacesNotSelected = false;
  for (let i = 0; i < props.tripDetails.length; i++) {
    const trip = props.tripDetails[i];
    console.log(trip);
    if (!trip?.from || !trip?.to) {
      isPlacesNotSelected = true;
      break;
    }
  }

  const { asPath } = useRouter();
  // @ts-ignore
  useEffect(() => {
    if (asPath.endsWith('home')) {
      Router.push({ pathname: '../' });
    }
  }, [props.type]);
  function handleTripValueChange(value: string) {
    props.setTripType(value);
  }

  return (
    <div className="flex items-center h-full">
      <div
        className={`ts-t-search-tabs-2 bg-white w-full relative space-y-6 w-2/5 rounded-10 mr-auto max-h-[550px] ${
          props.type == 3 ? 'overflow-y-auto' : ''
        }`}
      >
        <RadioGroup
          radioGroupName="tripTypes2"
          options={data.tripTypes}
          value={props.type}
          onValueChange={(value: string) => handleTripValueChange(value)}
          className={'py-1 mb-1 !text-lg pl-4'}
          key="1"
        ></RadioGroup>
        {props.tripDetails.map((trip, index) => {
          return (
            <div className={'flex flex-wrap'} key={index}>
              <HeaderLabel content={'From'} className="w-1/2" />
              <HeaderLabel
                content={'To'}
                className={`${trip.to && props.type != 3 && '!pl-8'} " w-1/2"`}
              />
              <div className={'flex w-full ts-t-filter-box flex-wrap mb-6'}>
                {
                  // @ts-ignore
                  <DropDown
                    className={`w-1/2 text-secondary cursor-pointer h-20`}
                    trigger={
                      trip.from ? (
                        <FlightTrigger
                          cityName={trip.from?.ct_name}
                          airportName={trip.from?.ap_name}
                        />
                      ) : (
                        <SelectPlace content="Select From" />
                      )
                    }
                    content={
                      // @ts-ignore
                      <FlightListDropDown
                        onSelect={props.setTripFrom}
                        index={index}
                        excludedCity={{}}
                      />
                    }
                  />
                }
                {props.type != 3 ? (
                  <div className={'w-0 border-0'}>
                    <div
                      onClick={props.toggleFromToLocations}
                      className="ts-toggle-button-2 absolute hover:bg-grey-secondary cursor-pointer"
                    ></div>
                  </div>
                ) : null}
                {
                  // @ts-ignore
                  <DropDown
                    className={classNames(
                      'cursor-pointer',
                      { '!pl-8': trip.to },
                      'w-1/2',
                      'h-20'
                    )}
                    trigger={
                      trip.to ? (
                        <FlightTrigger
                          cityName={trip.to?.ct_name}
                          airportName={trip.to?.ap_name}
                        />
                      ) : (
                        <SelectPlace content="Select To" />
                      )
                    }
                    content={
                      // @ts-ignore
                      <FlightListDropDown
                        onSelect={props.setTripTo}
                        index={index}
                        excludedCity={props.from}
                      />
                    }
                  />
                }
              </div>
              <HeaderLabel content={'Departure'} className="w-1/2" />
              {props.type != 3 && (
                <HeaderLabel content={'Return'} className={'w-1/2'} />
              )}
              <div className={'flex w-full ts-t-filter-box flex-wrap mb-6'}>
                {
                  // @ts-ignore
                  <DropDown
                    className={`w-1/2 text-secondary cursor-pointer h-20`}
                    trigger={
                      trip?.depart ? (
                        <React.Fragment>
                          <div>
                            <span className="text-2xl font-bold">{`${trip?.depart?.month} ${trip?.depart?.date},`}</span>
                            <span className="text-base font-normal pl-2">
                              {trip?.depart?.year}
                            </span>
                          </div>
                          <div className="text-base font-normal">
                            {trip?.depart?.day}
                          </div>
                        </React.Fragment>
                      ) : (
                        <SelectPlace content="Select Departure Date" />
                      )
                    }
                    content={
                      // @ts-ignore
                      <DatePicker
                        value={trip?.depart?.data}
                        index={index}
                        onChange={props.setDeparture}
                      />
                    }
                  />
                }
                {
                  // @ts-ignore
                  props.type != 3 ? (
                    props.type == 2 ? (
                      <DropDown
                        className={`w-1/2 text-secondary cursor-pointer h-20 !pl-4`}
                        trigger={
                          trip?.return ? (
                            <React.Fragment>
                              <div>
                                <span className="text-2xl font-bold">{`${trip?.return?.month} ${trip?.return?.date},`}</span>
                                <span className="text-base font-normal pl-2">
                                  {trip?.return?.year}
                                </span>
                              </div>
                              <div className="text-base font-normal">
                                {trip?.return?.day}
                              </div>
                            </React.Fragment>
                          ) : (
                            <SelectPlace content="Select Return Date" />
                          )
                        }
                        content={
                          // @ts-ignore
                          <DatePicker
                            value={trip?.return?.data}
                            index={index}
                            minDate={trip?.depart?.data}
                            onChange={props.setReturnDate}
                          />
                        }
                      />
                    ) : (
                      <div className="w-1/2">
                        <SelectPlace content="For Return Trip" />
                      </div>
                    )
                  ) : null
                }
              </div>
              {index === 0 ? (
                <HeaderLabel
                  content={'Passengers & Class'}
                  className={'w-1/2'}
                />
              ) : null}
              <div className={'flex w-full ts-t-filter-box flex-wrap mb-10'}>
                {index === 0 ? (
                  <DropDown
                    idName={'sample'}
                    className={`text-secondary cursor-pointer h-20 !pl-4`}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    trigger={
                      <React.Fragment>
                        <div className="text-2xl font-bold">{`${passengersCount} ${
                          passengersCount > 1 ? 'Travellers' : 'Traveller'
                        }`}</div>
                        <div className="text-base font-normal">{classType}</div>
                      </React.Fragment>
                    }
                    content={
                      // @ts-ignore
                      <PassengersAndClassForm
                        passengersAndClass={props.passengersAndClass}
                        onSave={props.setPassengersAndClass}
                      />
                    }
                  />
                ) : index == props.tripDetails.length - 1 ? (
                  <React.Fragment>
                    <div className="w-1/4 flex !p-0 h-full">
                      <div className="w-3/4 flex items-center justify-center">
                        <button
                          className="py-1.5 px-5 rounded-10 border border-primary text-lg font-bold text-primary hover:bg-primary hover:text-white"
                          onClick={props.addNewTrip}
                          id={'anothercity'}
                        >
                          + Add another city
                        </button>
                      </div>
                      <div className="w-1/4 flex justify-around border-l-[0.5px] border-[rgba(0, 0, 0, 0.2)]">
                        <ImageWithAssetPrefix
                          height={16}
                          width={16}
                          src={assetPrefix + '/home/close.svg'}
                          alt=""
                          className="w-4 cursor-pointer"
                          onClick={props.removeLastTrip}
                          id={'close-svg'}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="w-1/4"></div>
                )}
              </div>
            </div>
          );
        })}
        <div
          className={
            'w-full absolute ts-t-bottom-half-extension flex !mt-0 right-2.5'
          }
        >
          <button
            onClick={() => {
              Router.push({ pathname: '/home', query: { version: 1 } });
            }}
            disabled={isPlacesNotSelected}
            id="new-btn"
            className={
              'text-lg font-bold w-fit mx-auto bg-[#076bf3] text-white p-3 rounded-lg flex items-center gap-1.5'
            }
          >
            Find Flights
            <ImageWithAssetPrefix
              height={30}
              width={30}
              src={assetPrefix + '/search-icon.svg'}
              alt=""
              className="w-8 cursor-pointer ml-2"
              onClick={props.removeLastTrip}
              id={'closeSvg'}
            />
          </button>
        </div>
      </div>
      <div className="w-2/5">
        <Banner />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const trip = state?.trip || {};
  const tripDetails = trip?.tripDetails;
  const currentTripData = tripDetails?.[0] || {};
  return {
    from: currentTripData?.from,
    to: currentTripData?.to,
    depart: currentTripData?.depart,
    return: currentTripData?.return,
    passengersAndClass: trip?.passengersAndClass,
    type: trip?.type,
    tripDetails,
  };
};

const mapDispatchToProps = {
  setTripFrom,
  setTripTo,
  setDeparture,
  setReturnDate,
  setPassengersAndClass,
  setTripType,
  addNewTrip,
  removeLastTrip,
  toggleFromToLocations,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(V1FlightSearch);
