import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21,FORMAT_121} from "./Builder_Helpers"

export var fieldsDict = {
    "original_archive":{
        "sesarField":"original_archive",
        "message":"Name of institution",
        "fieldFormat":FORMAT_121
    },
    "current archive":{
        "sesarField":"current archive",
        "fieldFormat":FORMAT_121
    },
    "platform_name":{
        "sesarField":"platform_name",
        "message":"Name of platform for cruise",
        "fieldFormat":FORMAT_121
    },
    "cruise_field_prgrm":{
        "sesarField":"cruise_field_prgrm",
        "message":"Name or identifier of the field program during which the sample was collected.",
        "fieldFormat":FORMAT_121
    },
    "name":{
        "sesarField":"name",
        "message":"The Name of the sample.",
        "fieldFormat":FORMAT_121
    },
    "collection_method":{
        "sesarField":"collection_method",
        "message":"Method by which the sample was collected",
        "fieldFormat":FORMAT_121
    },
    "collection_start_date":{
        "sesarField":"collection_start_date",
        "message":"Date when the sample was collected. The format is YYYY-MM-DDTHH:MM:SSZ",
        "fieldFormat":FORMAT_DATE
    },
    "collection_end_date":{
        "sesarField":"collection_end_date",
        "message":"Date when the sample collection was finished",
        "fieldFormat":FORMAT_DATE
    },
    "latitude":{
        "sesarField":"latitude",
        "message":"Latitude of the location where the sample was collected. (Start latitude for linear sampling features)",
        "fieldFormat":FORMAT_121
    },
    "latitude_end":{
        "sesarField":"latitude_end",
        "message":"End latitude of the location where the sample was collected (WGS84)",
        "fieldFormat":FORMAT_121
    },
    "longitude":{
        "sesarField":"longitude",
        "message":"Longitude of the location where the sample was collected. (Start longitude for linear sampling features)",
        "fieldFormat":FORMAT_121
    },
    "longitude_end":{
        "sesarField":"longitude_end",
        "message":"End longitude of the location where the sample was collected (WGS84)",
        "fieldFormat":FORMAT_121
    },
    "elevation":{
        "sesarField":"elevation",
        "message":"Elevation at which a sample was collected (in meters). Use negative values for depth below sea level",
        "fieldFormat":FORMAT_121
    },
    "elevation_end":{
        "sesarField":"elevation_end",
        "message":"End elevation at which a sample was collected",
        "fieldFormat":FORMAT_121
    },
    "size":{
        "sesarField":"size",
        "message":"Size of the registered object",
        "fieldFormat":FORMAT_CONV
    },
    "size_unit CM IS COMMON":{
        "sesarField":"size_unit CM IS COMMON",
        "fieldFormat":FORMAT_CONV
    },
    "":{
        "sesarField":"",
        "fieldFormat":FORMAT_121
    },
    "collector":{
        "sesarField":"collector",
        "message":"Name of the person who collected the sample or name of chief scientist for larger field programs",
        "fieldFormat":FORMAT_121
    },
    "primary_location_type":{
        "sesarField":"primary_location_type",
        "message":"Physiographic feature or type of feture that your sample was collected from",
        "fieldFormat":FORMAT_121
    },
    "igsn":{
        "sesarField":"igsn",
        "message":"(AUTOMATIC) The 9-digit IGSN of the sample",
        "fieldFormat":FORMAT_121
    },
    "sample_comment":{
        "sesarField":"sample_comment",
        "message":"Any free text comment about the sample",
        "fieldFormat":FORMAT_121
    },
    "field_name KEYED LIST":{
        "sesarField":"field_name KEYED LIST",
        "fieldFormat":FORMAT_M21
    },
    "sample description":{
        "sesarField":"sample description",
        "fieldFormat":FORMAT_121
    },
    "geological_age":{
        "sesarField":"geological_age",
        "message":"Age of a sample as described by the stratigraphic era",
        "fieldFormat":FORMAT_121
    },
    "age (min)MA":{
        "sesarField":"age (min)MA",
        "fieldFormat":FORMAT_121
    },
    "age (max)MA":{
        "sesarField":"age (max)MA",
        "fieldFormat":FORMAT_121
    },
    "classification":{
        "sesarField":"classification",
        "message":"Classification",
        "fieldFormat":FORMAT_121
    },
    "sample_type":{
        "sesarField":"sample_type",
        "message":"The type of sample which comes from a SESAR controlled list",
        "fieldFormat":FORMAT_121
    }
}