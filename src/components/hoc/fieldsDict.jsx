import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21,FORMAT_121} from "./Builder_Helpers"

export var fieldsDict = {
    "original_archive":{ disabled:false,
        "sesarField":"original_archive",
        "message":"Name of institution",
        "format":FORMAT_121
    },
    "current archive":{ disabled:false,
        "sesarField":"current archive",
        "format":FORMAT_121
    },
    "platform_name":{ disabled:false,
        "sesarField":"platform_name",
        "message":"Name of platform for cruise",
        "format":FORMAT_121
    },
    "cruise_field_prgrm":{ disabled:false,
        "sesarField":"cruise_field_prgrm",
        "message":"Name or identifier of the field program during which the sample was collected.",
        "format":FORMAT_121
    },
    "name":{ disabled:false,
        "sesarField":"name",
        "message":"The Name of the sample.",
        "format":FORMAT_121
    },
    "collection_method":{ disabled:false,
        "sesarField":"collection_method",
        "message":"Method by which the sample was collected",
        "format":FORMAT_121
    },
    "collection_start_date":{ disabled:false,
        "sesarField":"collection_start_date",
        "message":"Date when the sample was collected. The format is YYYY-MM-DDTHH:MM:SSZ",
        "format":FORMAT_DATE
    },
    "collection_end_date":{ disabled:false,
        "sesarField":"collection_end_date",
        "message":"Date when the sample collection was finished",
        "format":FORMAT_DATE
    },
    "latitude":{ disabled:false,
        "sesarField":"latitude",
        "message":"Latitude of the location where the sample was collected. (Start latitude for linear sampling features)",
        "format":FORMAT_121
    },
    "latitude_end":{ disabled:false,
        "sesarField":"latitude_end",
        "message":"End latitude of the location where the sample was collected (WGS84)",
        "format":FORMAT_121
    },
    "longitude":{ disabled:false,
        "sesarField":"longitude",
        "message":"Longitude of the location where the sample was collected. (Start longitude for linear sampling features)",
        "format":FORMAT_121
    },
    "longitude_end":{ disabled:false,
        "sesarField":"longitude_end",
        "message":"End longitude of the location where the sample was collected (WGS84)",
        "format":FORMAT_121
    },
    "elevation":{ disabled:false,
        "sesarField":"elevation",
        "message":"Elevation at which a sample was collected (in meters). Use negative values for depth below sea level",
        "format":FORMAT_121
    },
    "elevation_end":{ disabled:false,
        "sesarField":"elevation_end",
        "message":"End elevation at which a sample was collected",
        "format":FORMAT_121
    },
    "size":{ disabled:false,
        "sesarField":"size",
        "message":"Size of the registered object",
        "format":FORMAT_CONV
    },
    "size_unit CM IS COMMON":{ disabled:false,
        "sesarField":"size_unit CM IS COMMON",
        "format":FORMAT_CONV
    },

    "collector":{ disabled:false,
        "sesarField":"collector",
        "message":"Name of the person who collected the sample or name of chief scientist for larger field programs",
        "format":FORMAT_121
    },
    "primary_location_type":{ disabled:false,
        "sesarField":"primary_location_type",
        "message":"Physiographic feature or type of feture that your sample was collected from",
        "format":FORMAT_121
    },
    "igsn":{ disabled:false,
        "sesarField":"igsn",
        "message":"(AUTOMATIC) The 9-digit IGSN of the sample",
        "format":FORMAT_121
    },
    "sample_comment":{ disabled:false,
        "sesarField":"sample_comment",
        "message":"Any free text comment about the sample",
        "format":FORMAT_121
    },
    "field_name KEYED LIST":{ disabled:false,
        "sesarField":"field_name KEYED LIST",
        "format":FORMAT_M21
    },
    "sample description":{ disabled:false,
        "sesarField":"sample description",
        "format":FORMAT_121
    },
    "geological_age":{ disabled:false,
        "sesarField":"geological_age",
        "message":"Age of a sample as described by the stratigraphic era",
        "format":FORMAT_121
    },
    "age (min)MA":{ disabled:false,
        "sesarField":"age (min)MA",
        "format":FORMAT_121
    },
    "age (max)MA":{ disabled:false,
        "sesarField":"age (max)MA",
        "format":FORMAT_121
    },
    "classification":{ disabled:false,
        "sesarField":"classification",
        "message":"Classification",
        "format":FORMAT_121
    },
    "sample_type":{ disabled:false,
        "sesarField":"sample_type",
        "message":"The type of sample which comes from a SESAR controlled list",
        "format":FORMAT_121
    }
}