const cleaner = require("../adons/cleanT/cleaner.js")
let thing = {
  additionalType: "",
  alternateName: "",
  description: "",
  disambiguatingDescription: "",
  identifier: "in4corners",
  image: "",
  mainEntityOfPage: "ImageGallery",
  name: "",
  potentialAction: "",
  sameAs: "",
  subjectOf: "in4corners",
  url: "",
  ItemList: {
    itemListElement: [
      {
        identifier: "DANGER_LOCKMEDOWN",
        mainEntityOfPage: "GovernmentPermit",
        Permit: {
          issuedBy: "in4corners",
          issuedThrough: "DANGER_LOCKMEDOWN",
          permitAudience: "*",
          validFor: "*",
        },
      },
      {
        additionalType: "",
        alternateName: "",
        description: "",
        disambiguatingDescription: "",
        identifier: "photo",
        mainEntityOfPage: "ImageObject",
        potentialAction: "",
        subjectOf: "photo",
        ItemList: {
          itemListElement: [],
          itemListOrder: "",
          numberOfItems: 0,
        },
        ImageObject: {
          caption: "",
          exifData: "",
          representativeOfPage: 0,
          thumbnail: "",
        },
        CreativeWork: {
          about: "",
          abstract: "abstract",
          commentCount: 0,
          contentRating: "",
          contentReferenceTime: "1970-01-01T00:00:00.000Z",
          copyrightYear: 0,
          datePublished: "1970-01-01",
          workTranslation: "",
        },
        MediaObject: {},
      },
    ],
    itemListOrder: "",
    numberOfItems: 2,
  },
  ImageGallery: {},
  CreativeWork: {
    commentCount: 0,
    conditionsOfAccess: "",
    contentLocation: "",
    contentRating: "",
    contentReferenceTime: "1970-01-01T00:00:00.000Z",
    datePublished: "1970-01-01",
    workExample: 0.0,
    workTranslation: "",
  },
  WebPage: {
    breadcrumb: "",
    lastReviewed: "1970-01-01",
    specialty: "",
  },
  CollectionPage: {},
  MediaGallery: {},
}
describe("cleaner", () => {
  it("does end up cleaner", () => {
    cleaner(thing).should.eql({
      identifier: "in4corners",
      mainEntityOfPage: "ImageGallery",
      subjectOf: "in4corners",
      ItemList: {
        itemListElement: [
          {
            identifier: "DANGER_LOCKMEDOWN",
            mainEntityOfPage: "GovernmentPermit",
            Permit: {
              issuedBy: "in4corners",
              issuedThrough: "DANGER_LOCKMEDOWN",
              permitAudience: "*",
              validFor: "*",
            },
          },
          {
            identifier: "photo",
            mainEntityOfPage: "ImageObject",
            subjectOf: "photo",
            ItemList: {
              itemListElement: [],
            },
            ImageObject: {},
            CreativeWork: {
              abstract: "abstract",
            },
            MediaObject: {},
          },
        ],
        numberOfItems: 2,
      },
      ImageGallery: {},
      CreativeWork: {},
      WebPage: {},
      CollectionPage: {},
      MediaGallery: {},
    })
  })
})
