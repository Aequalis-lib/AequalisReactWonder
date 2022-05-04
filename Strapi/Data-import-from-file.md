---
Author: "DHANRAJ M"
Source: "YOUTUBE"
DATE: "2020-05-04"
EstimatedTime: 1hr
---

# Import data from a file to strapi.

- Generally data can be added to strapi collection only manually.But this is a time taking process.
  Inorder to overcome this problem the below functionality could be used.

> prerequisite :
> you need to know how to create a strapi application & collection type.

> Step 1:

- Create a strapi application.
  in this example code we are going to create a collection named country.
- Country collection type has six fields.
  - country
  - destination
  - serviceType
  - region
  - vendor
  - flagCountryCode
- Create a collection type in the strapi admin using above data.

> step 2:

- store the JSON data in seperate file as a constant.

```javascript
const data = [
  {
    _id: "621991eece3f1f20e9f6f76f",
    country: "French Guiana",
    destination: "GUF",
    serviceType: "4G/LTE",
    region: "Latin America",
    vendor: "Celitech",
    flagCountryCode: "GF",
    createdOn: 1645794374423,
    packs: [
      {
        dataLimitInBytes: 1073741824,
        vendorPrice: 11,
        priceInWifiToken: 14,
      },
      {
        dataLimitInBytes: 2.147483648e9,
        vendorPrice: 20,
        priceInWifiToken: 26,
      },
      {
        dataLimitInBytes: 5.36870912e9,
        vendorPrice: 47,
        priceInWifiToken: 54,
      },
    ],
  },
  {
    _id: "6219938dce3f1f20e9f6f770",
    country: "Ireland",
    destination: "IRL",
    serviceType: "4G/LTE",
    region: "Europe",
    vendor: "Celitech",
    flagCountryCode: "IE",
    createdOn: 1645794374423,
    packs: [
      {
        dataLimitInBytes: 1073741824,
        vendorPrice: 5,
        priceInWifiToken: 8,
      },
      {
        dataLimitInBytes: 2.147483648e9,
        vendorPrice: 8,
        priceInWifiToken: 12,
      },
      {
        dataLimitInBytes: 5.36870912e9,
        vendorPrice: 18,
        priceInWifiToken: 24,
      },
    ],
  },
];

module.exports = data;
```

> step 3:

- Now open the created project in VScode.
- Navigate to config > functions > bootstrap.js file.
  > Note : This bootstrap.js file will be run on every server start.
- Add the below code in the file.
- below function will import the data to strapi collection.

```javascript
const data = require("../../data/data"); //data import

// In the below line we loop through the data and create a new document for each country.
data.forEach((entry) => {
  strapi.services.country.create({
    country: entry.country,
    destination: entry.destination,
    serviceType: entry.serviceType,
    region: entry.region,
    vendor: entry.vendor,
    flagCountryCode: entry.flagCountryCode,
  });
});
```

---

## Assessment for personal evaluation:

- Create a Strapi application.
   - Create a collection named country.
   - Create a file with JSON data.
   - Import that data into strapi using above method.

## FAQ :
