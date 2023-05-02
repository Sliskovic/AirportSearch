export interface AirportDetailDTO {
    subType: string,
    name:string,
    detailedName: string,
    id: string,
    self: {
        href: string,
        methods: [
          "GET"
        ]
      },
    timeZoneOffset: string
    iataCode: string,
    address: {
      cityName: string,
      countryName: string,
      countryCode: string,
      regionCode: string
    },
}