import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FlightList from '../../components/flight-list';
import MultiCityTripFlightList from '../../components/flight-list/multi-city-trip-list';
import RoundTripFlightList from '../../components/flight-list/round-trip-list';
import { HomeProperties } from '../../interfaces/home-properties';
import { FlightDetails } from '../../models/flight-details.model';
import { default as JsonData, default as data } from '../../public/data.json';
import { setSelectedFlightDetails } from '../../redux/actions/flightDetailActions';
import { Store } from '../../redux/store';
import flight_detailsService from '../../services/flight-details.service';
import FlightFilters from './../../components/flight-fliters';

function getFlightList(
  from: any,
  to: any,
  tripDetails: any,
  type: number,
  filters: any
): any {
  if (type == 3) {
    return getMultiCityFlightsArray(tripDetails);
  } else {
    return getSingleFlightArray(from, to, filters);
  }
}

function getMultiCityFlightsArray(tripDetails: any) {
  let host_airlines: string[] = [];
  let flightArray: any[] = [];
  let cities: any = JsonData.cities;
  let trips: any[] = [];
  let airlines: any = JsonData.airlines;
  tripDetails.forEach((tripDetail: any) => {
    let fromCity = tripDetail.from ? tripDetail.from : cities[0];
    let toCity = tripDetail.to ? tripDetail.to : cities[1];
    host_airlines = [
      ...host_airlines,
      ...fromCity.host_airlines,
      ...toCity.host_airlines,
    ];
    trips.push(getSingleFlightArray(fromCity, toCity)[0].trips[0]);
  });
  let fromCity = tripDetails[0].from ? tripDetails[0].from : cities[0];
  let toCity = tripDetails[tripDetails.length - 1].to
    ? tripDetails[tripDetails.length - 1].to
    : cities[1];
  airlines
    .filter((airline: any) => [...host_airlines].includes(airline.id))
    .forEach((airline: any) => {
      airline['flight_ids'].forEach((flightId: any, indexOfFid: number) => {
        let departureTime = fromCity.offset_time.split(':');
        let arrivalTime = toCity.offset_time.split(':');
        let fromDate = new Date(
          0,
          0,
          0,
          departureTime[0],
          Number(departureTime[1]) + (indexOfFid % 2 == 0 ? 15 : 0)
        );
        let toDate = new Date(
          0,
          0,
          0,
          arrivalTime[0],
          Number(arrivalTime[1]) + (indexOfFid % 2 == 0 ? 15 : 0)
        );
        // @ts-ignore
        let duration = new Date(toDate - fromDate).toISOString().slice(11, 16);
        let addDay = 0;
        if (duration == '00:00') {
          addDay = 1;
          fromDate.setDate(fromDate.getDate() + 1);
        }
        // @ts-ignore
        duration = new Date(toDate - fromDate).toISOString().slice(11, 16);

        let flight = {
          trips: [{ tr_path: trips }],
          ph_price: airline.price,
          f_id: flightId,
          tt:
            (addDay > 0
              ? 24 + Number(duration.split(':')[0])
              : duration.split(':')[0]) +
            ' h ' +
            duration.split(':')[1] +
            ' m',
          flightData: airlines.find((al: any) => al.id == airline.id),
        };

        let fromMinutes = fromDate.getMinutes().toString();
        let fromHours = fromDate.getHours().toString();
        let toMinutes = toDate.getMinutes().toString();
        let toHours = toDate.getHours().toString();

        // @ts-ignore
        flight['dt'] =
          (fromHours.length == 1 ? '0' : '') +
          fromHours +
          ':' +
          ((fromMinutes.length == 1 ? '0' : '') + fromMinutes);
        // @ts-ignore
        flight['at'] =
          (toHours.length == 1 ? '0' : '') +
          toHours +
          ':' +
          ((toMinutes.length == 1 ? '0' : '') + toMinutes);
        // @ts-ignore
        flight.ph_price = flight.ph_price * Number(flight.tt.split(' ')[0]);
        flightArray.push(flight);
      });
    });
  return flightArray;
}

function getSingleFlightArray(from: any, to: any, filters?: any): any {
  let flightArray: any[] = [];
  let cities: any = JsonData.cities;
  let trips: any[] = [];
  let roundTrips: any[] = [];
  let airlines: any = JsonData.airlines;
  let fromCity = from ? from : cities[0];
  let toCity = to ? to : cities[1];
  let host_airlines = [...fromCity.host_airlines, ...toCity.host_airlines];
  if (filters && filters.airlines.length != 0) {
    host_airlines = host_airlines.filter((host_airline) =>
      filters.airlines.includes(host_airline)
    );
  }
  trips.push({
    ct_id: fromCity.ct_id,
    dt: fromCity.offset_time,
    at: fromCity.offset_time,
  });
  trips.push({
    ct_id: toCity.ct_id,
    dt: toCity.offset_time,
    at: toCity.offset_time,
  });
  roundTrips.push({
    ct_id: toCity.ct_id,
    dt: toCity.offset_time,
    at: toCity.offset_time,
  });
  roundTrips.push({
    ct_id: fromCity.ct_id,
    dt: fromCity.offset_time,
    at: fromCity.offset_time,
  });
  airlines
    .filter((airline: any) => [...host_airlines].includes(airline.id))
    .forEach((airline: any, i: number) => {
      airline['flight_ids'].forEach((flightId: any, indexOfFid: number) => {
        let departureTime = fromCity.offset_time.split(':');
        let arrivalTime = toCity.offset_time.split(':');
        let fromDate = new Date(
          0,
          0,
          0,
          departureTime[0],
          Number(departureTime[1]) + (indexOfFid % 2 == 0 ? 15 : 0)
        );
        let toDate = new Date(
          0,
          0,
          0,
          arrivalTime[0],
          Number(arrivalTime[1]) + (indexOfFid % 2 == 0 ? 15 : 0)
        );
        // @ts-ignore
        let duration = new Date(toDate - fromDate).toISOString().slice(11, 16);
        let addDay = 0;
        if (duration == '00:00') {
          addDay = 1;
          fromDate.setDate(fromDate.getDate() + 1);
        }
        // @ts-ignore
        duration = new Date(toDate - fromDate).toISOString().slice(11, 16);
        let stoppedTrips = trips;
        if (indexOfFid == 1) {
          let fromCityIndex = cities.indexOf(
            cities.find((city: any) => city.ct_id == fromCity.ct_id)
          );
          let toCityIndex = cities.indexOf(
            cities.find((city: any) => city.ct_id == toCity.ct_id)
          );
          if (Math.abs(fromCityIndex - toCityIndex) > 1) {
            let stop1 =
              cities[
                (fromCityIndex > toCityIndex ? fromCityIndex : toCityIndex) - 1
              ];
            stoppedTrips = [
              trips[0],
              {
                ...stop1,
                lt: '00:15',
                at: stop1.offset_time,
                dt: stop1.offset_time,
              },
              trips[1],
            ];
          }
        } else if (indexOfFid == 2) {
          let fromCityIndex = cities.indexOf(
            cities.find((city: any) => city.ct_id == fromCity.ct_id)
          );
          let toCityIndex = cities.indexOf(
            cities.find((city: any) => city.ct_id == toCity.ct_id)
          );
          if (Math.abs(fromCityIndex - toCityIndex) > 2) {
            let stop1 =
              cities[
                (fromCityIndex > toCityIndex ? fromCityIndex : toCityIndex) - 1
              ];
            let stop2 =
              cities[
                (fromCityIndex > toCityIndex ? fromCityIndex : toCityIndex) - 2
              ];
            stoppedTrips = [
              trips[0],
              {
                ...stop1,
                lt: '00:15',
                at: stop1.offset_time,
                dt: stop1.offset_time,
              },
              {
                ...stop2,
                lt: '00:20',
                at: stop2.offset_time,
                dt: stop2.offset_time,
              },
              trips[1],
            ];
          }
        }
        let flight = {
          trips: [{ tr_path: stoppedTrips }, { tr_path: roundTrips }],
          ph_price: airline.price,
          f_id: flightId,
          tt:
            (addDay > 0
              ? 24 + Number(duration.split(':')[0])
              : duration.split(':')[0]) +
            ' h ' +
            duration.split(':')[1] +
            ' m',
          flightData: airlines.find((al: any) => al.id == airline.id),
          stops: stoppedTrips.length - 2,
          lt: stoppedTrips.length == 4 ? 35 : stoppedTrips.length == 3 ? 15 : 0,
          refundable:
            (indexOfFid == 0 && i == 0) ||
            (indexOfFid == 1 && i == 1) ||
            (indexOfFid == 2 && i == 2),
          dt: '',
          at: '',
        };
        let fromMinutes = fromDate.getMinutes().toString();
        let fromHours = fromDate.getHours().toString();
        let toMinutes = toDate.getMinutes().toString();
        let toHours = toDate.getHours().toString();

        // @ts-ignore
        flight['dt'] =
          (fromHours.length == 1 ? '0' : '') +
          fromHours +
          ':' +
          ((fromMinutes.length == 1 ? '0' : '') + fromMinutes);
        // @ts-ignore
        flight['at'] =
          (toHours.length == 1 ? '0' : '') +
          toHours +
          ':' +
          ((toMinutes.length == 1 ? '0' : '') + toMinutes);
        // @ts-ignore
        flight.ph_price = flight.ph_price * Number(flight.tt.split(' ')[0]);
        let durationRange =
          ((addDay > 0 ? 24 : 0) + Number(duration.split(':')[0])) * 60 +
          Number(duration.split(':')[1]);

        if (
          !(filters?.priceRange && flight.ph_price > filters.priceRange) &&
          !(
            filters?.stopsCount?.length > 0 &&
            !filters?.stopsCount.includes(flight.stops)
          ) &&
          !(filters?.durationRange && durationRange > filters.durationRange) &&
          !(
            filters?.layoverDurationRange &&
            flight.lt > filters.layoverDurationRange
          ) &&
          !(
            filters?.favFilters?.includes('refundable') && !flight.refundable
          ) &&
          !(filters?.favFilters?.includes('oneStop') && flight.stops != 1) &&
          // @ts-ignore
          !(
            filters?.favFilters?.includes('morningDeparture') &&
            !filters?.favFilters?.includes('lateDeparture') &&
            Number(flight['dt'].split(':')[0]) > 12
          ) &&
          // @ts-ignore
          !(
            filters?.favFilters?.includes('lateDeparture') &&
            !filters?.favFilters?.includes('morningDeparture') &&
            Number(flight['dt'].split(':')[0]) <= 12
          )
        ) {
          flightArray.push(flight);
        }
      });
    });
  return [...flightArray];
}

const Home = (props: HomeProperties) => {
  const [flightArray, setFlightArray] = useState(
    getFlightList(
      props.from,
      props.to,
      props.tripDetails,
      props.type,
      props.filters
    )
  );
  const [isAscending, setIsAscending] = useState(true);
  let [sortedByColumn, setSortedByColumn] = useState('pop');
  const [sortName, setSortName] = useState('id');
  const [oneWay, setOneWay] = useState<FlightDetails[]>([]);
  const [multiTrip, setMultiTrp] = useState<FlightDetails[]>([]);

  function sortBy(sortedColumn: string) {
    if (sortedColumn == sortedByColumn) {
      let a = !isAscending;
      setIsAscending(a);
    } else {
      setSortedByColumn(sortedColumn);
      setIsAscending(true);
    }

    if (sortedColumn == 'pop') {
      setSortName('id');
    } else if (sortedColumn == 'dt') {
      setSortName('startTime');
    } else if (sortedColumn == 'tt') {
      setSortName('duration');
    } else if (sortedColumn == 'at') {
      setSortName('endTime');
    } else if (sortedColumn == 'ph_price') {
      setSortName('unitPrice');
    }
  }

  useEffect(() => {
    setFlightArray([
      ...getFlightList(
        props.from,
        props.to,
        props.tripDetails,
        props.type,
        props.filters
      ),
    ]);

    sortBy(sortedByColumn);
  }, [props.filters]);

  const tripArray = props.tripDetails.map((trip: any) => {
    return { from: trip.from?.ct_id, to: trip.to?.ct_id };
  });

  const params = {
    sortBy: sortName,
    order: !isAscending,
    query: '',
  };

  function buildQuery(filters: any) {
    console.log(filters);
    let query: string = '';
    if (filters.airlines.length > 0) {
      const airlines = filters.airlines
        .map((id: string) => {
          const airline = data.airlines.find((a: any) => a.id === id);
          return airline ? airline.name : '';
        })
        .filter(Boolean)
        .join('%23');
      query += `name@${airlines},`;
    }

    if (filters.priceRange != 0) {
      query += `unitPrice<${filters.priceRange},`;
    }

    if (
      filters.layoverDurationRange != 0 &&
      filters.layoverDurationRange != 1440
    ) {
      query += `layoverTime<${filters.layoverDurationRange},`;
    }

    if (filters.durationRange != 0 && filters.durationRange != 1440) {
      query += `duration<${filters.durationRange},`;
    }

    if (filters.favFilters.length > 0) {
      filters.favFilters.forEach((favFilter: any) => {
        if (favFilter == 'refundable') {
          query += 'refundable:true,';
        } else if (favFilter == 'oneStop') {
          query += 'stopCount:1,';
        } else if (favFilter == 'morningDeparture') {
          query += 'departure:true,';
        } else if (favFilter == 'lateDeparture') {
          query += 'departure:false,';
        }
      });
    }

    if (filters.stopsCount.length > 0) {
      const airlines = filters.stopsCount.join('%23');
      query += `stopCount@${airlines},`;
    }
    if (sortName) {
      query += `sort:${sortName}%26${isAscending},`;
    }
    return query;
  }

  useEffect(() => {
    let query = buildQuery(props.filters);
    if (props.type == 1) {
      query += `fromCityId:${tripArray[0].from},toCityId:${tripArray[0].to}`;
      flight_detailsService.show(query).then((r) => {
        // @ts-ignore
        setOneWay(r.content);
      });
    }
    if (props.type == 2) {
      const query1 = `fromCityId:${tripArray[0].from},toCityId:${tripArray[0].to}`;
      const query2 = `fromCityId:${tripArray[0].to},toCityId:${tripArray[0].from}`;

      Promise.all([
        flight_detailsService.show(query + query1),
        flight_detailsService.show(query + query2),
      ]).then(([response1, response2]) => {
        // @ts-ignore
        const twoWaysData = [response1.content, response2.content];
        // @ts-ignore
        twoFlight(twoWaysData);
      });
    }
    if (props.type == 3) {
      let multiCityData: any = [];
      const promises = tripArray.map((trip: any, index: number) => {
        let flight = `fromCityId:${trip.from},toCityId:${trip.to},`;
        return flight_detailsService.show(query + flight).then((r) => {
          // @ts-ignore
          return r.content;
        });
      });

      Promise.all(promises).then((results) => {
        multiCityData = results;
        twoFlight(multiCityData);
      });
    }
  }, [
    props.from,
    props.to,
    props.tripDetails,
    props.filters,
    sortName,
    isAscending,
  ]);

  function twoFlight(twoWaysData: any) {
    const finalArrayList: any[] = [];

    generateCombos(twoWaysData, 0, [], finalArrayList);

    const filteredFlights = finalArrayList.filter(
      (flightCombo) => flightCombo.length === twoWaysData.length
    );

    setMultiTrp(filteredFlights);
  }

  function generateCombos(
    flightDetailsList: any,
    listIndex: number,
    combo: [],
    finalArrayList: any
  ) {
    if (listIndex === flightDetailsList.length) {
      finalArrayList.push([...combo]);
      return;
    }

    const currentList = flightDetailsList[listIndex];
    for (const flight of currentList) {
      // @ts-ignore
      combo.push(flight);
      generateCombos(flightDetailsList, listIndex + 1, combo, finalArrayList);
      combo.pop();
    }
  }

  return (
    <>
      <div className="sm:container m-auto">
        <div className="flex">
          <div className="ts-t-flight-filters-wrapper">
            <FlightFilters />
          </div>
          <div className="flex basis-4/5">
            {props.type == 1 && (
              <FlightList
                setSelectedFlightDetails={props.setSelectedFlightDetails}
                flightArray={oneWay}
                sortBy={sortBy}
                isAscending={isAscending}
                sortedByColumn={sortedByColumn}
                selectedDate={props.tripDetails}
              />
            )}

            {props.type == 2 && (
              <RoundTripFlightList
                setSelectedFlightDetails={props.setSelectedFlightDetails}
                flightArray={multiTrip}
                sortBy={sortBy}
                isAscending={isAscending}
                sortedByColumn={sortedByColumn}
                selectedDate={props.tripDetails}
              />
            )}

            {props.type == 3 && (
              <MultiCityTripFlightList
                setSelectedFlightDetails={props.setSelectedFlightDetails}
                flightArray={multiTrip}
                sortBy={sortBy}
                isAscending={isAscending}
                sortedByColumn={sortedByColumn}
                selectedDate={props.tripDetails}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  setSelectedFlightDetails,
};

const mapStateToProps = (state: Store) => {
  const trip = state?.trip || {};
  const tripDetails = trip?.tripDetails || [];
  const currentTripData = tripDetails?.[0] || {};
  const endTripData = tripDetails?.[tripDetails.length - 1];
  const type = trip.type;
  return {
    from: currentTripData?.from,
    to: endTripData?.to,
    type: type,
    tripDetails: tripDetails,
    filters: state.filters,
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Home);
