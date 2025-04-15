import classNames from 'classnames';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlightSearchProps } from '../../interfaces/flight-search-props';
import { FlightTriggerProps } from '../../interfaces/flight-trigger';
import { HeaderLabelProps } from '../../interfaces/header-label-props';
import { assetPrefix } from '../../next.config';
import data from '../../public/data.json';
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
import getCurrentDateDetails from '../../utils/dateFormater';
import DatePicker from '../date-picker';
import DropDown from '../dropdown';
import FlightListDropDown from '../flight-list-dropdown';
import ImageWithAssetPrefix from '../image/image';
import PassengersAndClassForm from '../passengers-classes';
import RadioGroup from '../radio-button-group';

const SelectPlace = (props: any) => {
  return (
    <div
      className={`h-full flex items-center justify-center ${
        ['For Return Trip', 'Select Return Date'].includes(props.content)
          ? 'min-h-[46px] lg:!min-w-max xl:!min-w-[210px]'
          : 'h-full min-h-[46px]'
      }`}
    >
      <span className="lg:!text-xl 2xl:!text-2xl text-secondary font-bold">
        {props.content}
      </span>
    </div>
  );
};

const FlightTrigger = (props: FlightTriggerProps) => {
  return (
    <React.Fragment>
      <div
        className={
          'lg:!text-xl 2xl:!text-2xl truncate ct_name leading-7 pr-4 font-bold'
        }
      >
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
      className={`text-lg font-bold text-secondary pl-5 pb-2.5${
        props.className ? ` ${props.className}` : ''
      }`}
    >
      {props.content}
    </div>
  );
};

const V2FlightSearch = (props: FlightSearchProps) => {
  function id(index: any) {
    var idMapper = new Map();
    idMapper.set(1, 'one');
    idMapper.set(2, 'two');
    idMapper.set(3, 'three');
    idMapper.set(4, 'four');
    idMapper.set(5, 'five');
    idMapper.set(6, 'six');
    idMapper.set(7, 'seven');
    idMapper.set(8, 'eight');
    idMapper.set(9, 'nine');
    idMapper.set(10, 'ten');
    return idMapper.get(index);
  }

  const [myFlightData, setMyFlightData] = React.useState<{}>({
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
    setMyFlightData({
      ...myFlightData,
      tripTypes: data.tripTypes,
      tripType: data.tripTypes[0],
      from: {
        ct_name: data.cities[0]['ct_name'],
        ap_name: data.cities[0]['ap_name'],
        host_airlines: data.cities[0]['host_airlines'],
        ct_id: data.cities[0]['ct_id'],
      },
      to: {
        ct_name: data.cities[1]['ct_name'],
        ap_name: data.cities[1]['ap_name'],
        host_airlines: data.cities[1]['host_airlines'],
        ct_id: data.cities[1]['ct_id'],
      },
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
  console.log(data.tripTypes);
  return (
    <>
      <div className="flex flex-col">
        <div
          className={
            'bg-white mx-auto mb-6 w-fit rounded-md px-6 ts-t-v4-flight-search'
          }
        >
          <RadioGroup
            radioGroupName="tripTypes"
            options={data.tripTypes}
            value={props.type}
            onValueChange={(value: string) => handleTripValueChange(value)}
            className={'!text-lg'}
            labelClassName={
              'ts-t-v4-flight-search-radio-label border-[transparent] border-b-2 !px-0 py-3.5'
            }
            key="1"
          ></RadioGroup>
        </div>
        {props.tripDetails.map((trip, index) => {
          return (
            <div
              className={'flex flex-col xl:!flex-row gap-8 w-full mb-5'}
              key={index}
            >
              <div
                className={
                  'flex rounded-xl px-5 py-8 bg-white gap-2 w-full xl:!w-[44%] 2xl:!w-[49.5%]'
                }
              >
                {
                  // @ts-ignore
                  <div className="w-[49%]">
                    <HeaderLabel content={'From'} />
                    <div className="border px-5 rounded-xl flex items-center py-3 w-full">
                      <DropDown
                        idName={'depatcher-route-' + id(index + 1)}
                        className={` text-secondary cursor-pointer`}
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
                    </div>
                  </div>
                }
                {props.type != 3 ? (
                  <div className={'w-0 border-0 relative top-8 -left-5'}>
                    <div
                      onClick={props.toggleFromToLocations}
                      className="ts-toggle-button w-[38px] !h-[40px] absolute top-[14px] hover:bg-grey-secondary cursor-pointer"
                      id="toggle"
                    ></div>
                  </div>
                ) : null}
                {
                  <div className="w-[49%]">
                    <HeaderLabel content={'To'} />
                    <div className="border px-5 rounded-xl flex items-center py-3 w-full">
                      <DropDown
                        idName={'arrival-route-' + id(index + 1)}
                        className={classNames('cursor-pointer', {
                          '!pl-8': trip.to && props.type != 3,
                        })}
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
                    </div>
                  </div>
                }
              </div>
              <div className="flex rounded-xl md:justify-between px-5 py-8 bg-white gap-4 xl:!w-[53%] 2xl:!w-[48%] w-full">
                {
                  <div
                    className={`${
                      props.type == 3 ? 'md:!w-1/2' : 'md:!w-[33%]'
                    } `}
                  >
                    <HeaderLabel content={'Departure'} type={props.type} />
                    <div className="border px-5 rounded-xl flex items-center py-3">
                      <DropDown
                        idName={'depart-route-' + id(index + 1)}
                        className={` text-secondary cursor-pointer`}
                        trigger={
                          trip?.depart ? (
                            <React.Fragment>
                              <div>
                                <span className="lg:!text-xl 2xl:!text-2xl font-bold">{`${trip?.depart?.month} ${trip?.depart?.date},`}</span>
                                {/* <br className='2xl:!hidden xl:!block' /> */}
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
                      ></DropDown>
                    </div>
                  </div>
                }
                {
                  // @ts-ignore
                  props.type != 3 ? (
                    <div className="">
                      <HeaderLabel content={'Return'} />
                      {props.type == 2 ? (
                        <div className="border px-5 rounded-xl flex items-center py-3">
                          <DropDown
                            idName={'return-route-' + id(index + 1)}
                            className={` text-secondary cursor-pointer`}
                            trigger={
                              trip?.return ? (
                                <React.Fragment>
                                  <div>
                                    <span className="lg:!text-xl 2xl:!text-2xl font-bold">{`${trip?.return?.month} ${trip?.return?.date},`}</span>
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
                          ></DropDown>
                        </div>
                      ) : (
                        <div className="border px-5 rounded-xl flex items-center py-3">
                          <div>
                            <SelectPlace content="For Return Trip" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null
                }
                {index === 0 ? (
                  <div
                    className={`${
                      props.type == 3 ? 'md:!w-1/2' : 'md:!w-[33%]'
                    } `}
                  >
                    <HeaderLabel content={'Passengers & Class'} />
                    <div className="border px-5 rounded-xl flex items-center py-3">
                      <DropDown
                        className={` text-secondary cursor-pointer`}
                        idName={'travellers-route-' + id(index + 1)}
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
                            <div className="lg:!text-xl 2xl:!text-2xl font-bold">{`${passengersCount} ${
                              passengersCount > 1 ? 'Travellers' : 'Traveller'
                            }`}</div>
                            <div className="text-base font-normal">
                              {classType}
                            </div>
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
                    </div>
                  </div>
                ) : index == props.tripDetails.length - 1 ? (
                  <React.Fragment>
                    <div className="flex !p-0 ml-12">
                      <div className="flex items-center mt-8 justify-center">
                        <button
                          className="py-1.5 px-5 rounded-10 border border-[#076bf3] text-lg font-bold text-[#076bf3] hover:bg-[#076bf3] hover:text-white whitespace-nowrap"
                          onClick={props.addNewTrip}
                          id={'next-city'}
                        >
                          + Add another city
                        </button>
                      </div>
                      <div className="flex justify-around mt-8 ml-4 ">
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
        <div className={'w-full flex'}>
          <button
            onClick={() => {
              Router.push({ pathname: '/home', query: { version: 2 } });
            }}
            disabled={isPlacesNotSelected}
            id="new-btn"
            className={
              'text-lg font-bold w-fit ml-auto bg-[#076bf3] text-white p-3 rounded-lg flex items-center gap-1.5'
            }
          >
            Search Flights
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
    </>
  );
};

const mapStateToProps = (state: any) => {
  const trip = state?.trip || {};
  const tripDetails = trip?.tripDetails;
  const currentTripData = tripDetails?.[0] || {};
  console.log(trip);
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
export default connect(mapStateToProps, mapDispatchToProps)(V2FlightSearch);
