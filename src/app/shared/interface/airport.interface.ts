export interface AirportDTO {
    name: string;
    id: number
    iataCode: string;
    address: {
      cityName: string,
      countryName: string
    }
}