const thumb = src =>
  src.replace(/\/([^/]+)\.[^/.]+$/, "/thumbs/$1.webp");

const files = (dir, ...names) =>
  names.map(name => `assets/images/${dir}/${name}`);

const product = (
  id,
  category,
  subcategory,
  subcategoryLabel,
  brand,
  name,
  subtitle,
  gallery,
  album = false
) => ({
  id,
  category,
  subcategory,
  subcategoryLabel,
  brand,
  name,
  subtitle,
  price: "CONTACT",
  image: thumb(gallery[0]),
  gallery,
  album
});

const album = (...args) =>
  product(...args, true);

const products = [

  /* WHEELS */

  album(
    1,
    "wheels-suspension",
    "wheels",
    "WHEELS",
    "CARLISM",
    "Carlism TH Custom forged wheels",
    "Bronze Finish",
    files(
      "wheels/478",
      "DSC00478.jpg",
      "DSC00476.jpg",
      "DSC00493.jpg",
      "DSC00475.jpg",
      "DSC00469.jpg"
    )
  ),

  album(
    2,
    "wheels-suspension",
    "wheels",
    "WHEELS",
    "CARLISM",
    "Carlism TH Custom forged wheels",
    "Matte Black",
    files(
      "wheels/673",
      "DSC00673.jpg",
      "DSC00679.jpg",
      "DSC00693.jpg",
      "DSC00701.jpg"
    )
  ),

  album(
    3,
    "wheels-suspension",
    "wheels",
    "WHEELS",
    "CARLISM",
    "Carlism TH Custom forged wheels",
    "Gloss Black",
    files(
      "wheels/1003",
      "DSC01003.jpg",
      "DSC01012.jpg",
      "DSC00996.jpg",
      "DSC00992.jpg",
      "DSC00998.jpg"
    )
  ),

  album(
    4,
    "wheels-suspension",
    "wheels",
    "WHEELS",
    "CARLISM",
    "Carlism TH Custom forged wheels",
    "Bronze Finish",
    files(
      "wheels/736",
      "DSC00736.jpg",
      "DSC00727.jpg",
      "DSC00735.jpg",
      "DSC00724.jpg"
    )
  ),

  album(
    5,
    "wheels-suspension",
    "wheels",
    "WHEELS",
    "CARLISM",
    "Carlism TH Custom forged wheels",
    "Silver Finish",
    files(
      "wheels/660",
      "DSC00660.jpg",
      "DSC00662.jpg",
      "DSC00651.jpg",
      "DSC00658.jpg"
    )
  ),

  product(
    34,
    "wheels-suspension",
    "suspension",
    "SUSPENSION",
    "CARLISM",
    "Performance Suspension",
    "Coilover Suspension Upgrade",
    files(
      "wheels",
      "s.jpg"
    )
  ),


  /* PERFORMANCE */

  product(
    6,
    "performance",
    "engine",
    "ENGINE",
    "APR",
    "APR Ignition Coil Pack",
    "High-Performance Ignition Upgrade",
    files(
      "performance",
      "DSC09248.jpg"
    )
  ),

  product(
    7,
    "performance",
    "exhaust",
    "EXHAUST",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "DSC09558.jpg"
    )
  ),

  product(
    8,
    "performance",
    "intake",
    "INTAKE",
    "CARLISM",
    "Performance Intake",
    "Air Intake Upgrade",
    files(
      "performance",
      "4.jpg"
    )
  ),

  product(
    32,
    "performance",
    "exhaust",
    "EXHAUST",
    "CARLISM",
    "Performance Exhaust",
    "Exhaust System Upgrade",
    files(
      "performance",
      "5.jpg"
    )
  ),

  product(
    53,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "6.jpg"
    )
  ),

  product(
    54,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "7.jpg"
    )
  ),

  product(
    55,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "8.jpg"
    )
  ),

  product(
    56,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "9.jpg"
    )
  ),

  product(
    57,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "10.jpg"
    )
  ),

  product(
    58,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "11.jpg"
    )
  ),

  product(
    59,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "12.jpg"
    )
  ),

  product(
    60,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "13.jpg"
    )
  ),

  product(
    61,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "14.jpg"
    )
  ),

  product(
    62,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "S__167165975_0.jpg"
    )
  ),

  product(
    63,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "S__167165976_0.jpg"
    )
  ),

  product(
    64,
    "performance",
    "performance",
    "PERFORMANCE",
    "CARLISM",
    "Performance Upgrade",
    "Performance Parts & Upgrade",
    files(
      "performance",
      "S__167166012_0.jpg"
    )
  ),


  /* ACCESSORIES */

  product(
    33,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "DSC09270.jpg"
    )
  ),

  product(
    35,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "S__167165974_0.jpg"
    )
  ),

  product(
    36,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "S__167165989_0.jpg"
    )
  ),

  product(
    37,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "S__167166001_0.jpg"
    )
  ),

  product(
    38,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "S__167166006_0.jpg"
    )
  ),

  product(
    39,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "S__167166015_0.jpg"
    )
  ),

  product(
    40,
    "accessories",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Automotive Accessories",
    "Selected Vehicle Accessories",
    files(
      "Accessories",
      "S__167166016_0.jpg"
    )
  ),


  /* EXTERIOR */

  product(
    9,
    "exterior",
    "front-lip",
    "FRONT LIP",
    "CARLISM",
    "Front Lip",
    "Sport Aero Upgrade",
    files(
      "exterior/front lip",
      "DSC00088.jpg",
      "DSC00416.jpg",
      "DSC08913.jpg",
      "DSC09036 (1).jpg",
      "DSC09577.jpg",
      "DSC09843.jpg"
    )
  ),

  product(
    10,
    "exterior",
    "side-skirts",
    "SIDE SKIRTS",
    "CARLISM",
    "Side Skirts",
    "Side Aero Upgrade",
    files(
      "exterior/side skirts",
      "DSC08995.jpg",
      "DSC09041.jpg",
      "DSC09389.jpg"
    )
  ),

  product(
    11,
    "exterior",
    "diffuser",
    "DIFFUSER",
    "CARLISM",
    "Rear Diffuser",
    "Rear Aero Styling",
    files(
      "exterior/diffuser",
      "DSC01026.jpg",
      "DSC09048.jpg",
      "DSC09284.jpg"
    )
  ),

  product(
    41,
    "exterior",
    "diffuser",
    "DIFFUSER",
    "CARLISM",
    "Rear Diffuser",
    "Rear Aero Styling",
    files(
      "exterior/diffuser",
      "S__167165971_0.jpg"
    )
  ),

  product(
    42,
    "exterior",
    "diffuser",
    "DIFFUSER",
    "CARLISM",
    "Rear Diffuser",
    "Rear Aero Styling",
    files(
      "exterior/diffuser",
      "S__167166007_0.jpg"
    )
  ),

  product(
    25,
    "exterior",
    "canards",
    "CANARDS",
    "CARLISM",
    "Canards",
    "Aerodynamic Exterior Upgrade",
    files(
      "exterior/canards",
      "DSC00505.jpg",
      "DSC00703.jpg",
      "DSC08943.jpg",
      "DSC09002.jpg",
      "DSC09054.jpg",
      "DSC09832.jpg"
    )
  ),

  

  product(
    26,
    "exterior",
    "spoiler",
    "SPOILER & WING",
    "CARLISM",
    "Spoiler & Wing",
    "Rear Aero Upgrade",
    files(
      "exterior/spoiler",
      "DSC00569.jpg",
      "DSC08819.jpg",
      "DSC08903.jpg",
      "DSC09057.jpg",
      "2.jpg",
      "DSC00151.jpg"
    )
  ),

  product(
    48,
    "exterior",
    "spoiler",
    "SPOILER & WING",
    "CARLISM",
    "Spoiler & Wing",
    "Rear Aero Upgrade",
    files(
      "exterior/spoiler",
      "1.jpg"
    )
  ),

  product(
    27,
    "exterior",
    "side-mirrors",
    "SIDE MIRRORS",
    "CARLISM",
    "Side Mirror Upgrade",
    "Exterior Styling",
    files(
      "exterior/side mirrors",
      "DSC00587.jpg"
    )
  ),

  product(
    47,
    "exterior",
    "side-mirrors",
    "SIDE MIRRORS",
    "CARLISM",
    "Side Mirror Upgrade",
    "Exterior Styling",
    files(
      "exterior/side mirrors",
      "S__167166013_0.jpg"
    )
  ),

  product(
    28,
    "exterior",
    "front-grille",
    "FRONT GRILLE",
    "CARLISM",
    "Front Grille",
    "Front-End Styling Upgrade",
    files(
      "exterior/Front Grille",
      "S__167166004_0.jpg",
      "DSC08936.jpg",
      "DSC00495.jpg",
      "DSC08720.jpg"
    )
  ),


  product(
    29,
    "exterior",
    "hood-trunk-lid",
    "HOOD & TRUNK LID",
    "CARLISM",
    "Hood & Trunk Lid",
    "Exterior Body Upgrade",
    files(
      "exterior/Hood & Trunk Lid",
      "S__167165972_0.jpg",
      "S__167165970_0.jpg",
      "DSC09701.jpg",
      "DSC00638.jpg",
      "DSC09948.jpg"
    )
  ),

  product(
    46,
    "exterior",
    "hood-trunk-lid",
    "HOOD & TRUNK LID",
    "CARLISM",
    "Hood & Trunk Lid",
    "Exterior Body Upgrade",
    files(
      "exterior/Hood & Trunk Lid",
      "S__167165977_0.jpg"
    )
  ),

  product(
    30,
    "exterior",
    "door-handles",
    "DOOR HANDLES",
    "CARLISM",
    "Door Handle Upgrade",
    "Exterior Detail Upgrade",
    files(
      "exterior/Door Handles",
      "DSC08554.jpg"
    )
  ),

  product(
    31,
    "exterior",
    "light",
    "LIGHTING",
    "CARLISM",
    "Lighting Upgrade",
    "Exterior Lighting",
    files(
      "exterior/light",
      "DSC00093.jpg",
      "DSC00124.jpg",
      "DSC00144.jpg"
    )
  ),


  /* INTERIOR */

  product(
    12,
    "interior",
    "steering",
    "STEERING",
    "CARLISM",
    "BMW Custom Steering Wheel",
    "Carbon / Alcantara",
    files(
      "interior",
      "DSC09195.jpg",
      "DSC08514.jpg"
    )
  ),

  product(
    14,
    "interior",
    "steering",
    "STEERING",
    "CARLISM",
    "MOMO Racing Steering Wheel",
    "Motorsport Interior",
    files(
      "interior",
      "DSC09909.jpg"
    )
  ),

  album(
    21,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Interior Carbon Trim",
    "Carbon Interior Upgrade",
    [
      ...files(
        "interior",
        "DSC00441.jpg"
      ),
      ...files(
        "interior/441",
        "DSC00433.jpg",
        "DSC00437.jpg",
        "DSC00444.jpg",
        "DSC08688.jpg"
      )
    ]
  ),

  product(
    22,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Digital Cluster Coding",
    "Display Coding & Configuration",
    files(
      "interior",
      "DSC08517.jpg"
    )
  ),

  product(
    23,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Carbon Paddle Shifter",
    "Carbon Fiber Paddle Upgrade",
    files(
      "interior",
      "DSC09205.jpg"
    )
  ),

  product(
    24,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Mercedes-Benz Carbon Interior Trim",
    "Carbon Fiber Interior Upgrade",
    files(
      "interior",
      "DSC00042.jpg"
    )
  ),

  product(
    50,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Interior Upgrade",
    "Interior Styling Upgrade",
    files(
      "interior",
      "S167165992_0.jpg"
    )
  ),

  product(
    51,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Interior Upgrade",
    "Interior Styling Upgrade",
    files(
      "interior",
      "S__167166010_0.jpg"
    )
  ),

  product(
    52,
    "interior",
    "accessories",
    "ACCESSORIES",
    "CARLISM",
    "Interior Upgrade",
    "Interior Styling Upgrade",
    files(
      "interior",
      "S__167166011_0.jpg"
    )
  ),


  /* TUNING */

  product(
    15,
    "tuning",
    "tuning",
    "TUNING SERVICE",
    "CARLISM",
    "ECU & Performance Tuning",
    "Professional Vehicle Calibration",
    files(
      "tuning",
      "DSC09231.jpg"
    )
  )

];

window.products = products;