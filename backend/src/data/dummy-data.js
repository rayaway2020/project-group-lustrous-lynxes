const dummyData = [
    { 
        _id: "XZ868t23Pb4", 
        title: "7 rings",
        artist: "Ariana Grande",
        duration: 179000,
        thumbnailUrl: "https://lh3.googleusercontent.com/3LV6GoLom0Vb_oNFTXI_e2NIua0D-WocCifEFnSQattWpLfswpayWPzZ2BeClAB5QxR2EnGZkgh7QI7j=w120-h120-l90-rj"
    },
    {
        _id: "QMKG0KV452w",
        title: "Come Through (feat. Chris Brown)",
        artist: "H.E.R.",
        duration: 215000,
        thumbnailUrl: "https://lh3.googleusercontent.com/68M62pNye5-Jjf1XK_hpVfcD_FQooJwf4tEhQqu7UQbQjjysBoclw9rXPiOdm6c1gHHoiSfUnDiGTuIr=w120-h120-l90-rj"
    },
    {
        _id: "HNibLPBq9Cw",
        title: "Back to the Streets (feat. Jhené Aiko)",
        artist: "Saweetie",
        duration: 190000,
        thumbnailUrl: "https://lh3.googleusercontent.com/p0Lg1HdULKg3YHf0RZJy5PMIf6pNzdk4YY5g4mcE8pMYIDqxDmK_4ZibyF2mXlL60IVVYehuHZJmRQaM=w120-h120-l90-rj"
    },
    {
        _id: "vgyn10eb1t0",
        title: "City Girls",
        artist: "Chris Brown",
        duration: 231000,
        thumbnailUrl: "https://lh3.googleusercontent.com/ifxR4BvLBSW9Rs6y2DiDURSAf5JiUY1247RD7N1PMvFbLjHOk3-bOB_EoEkuVhPtNrEV9O0rWO0dfzrLVA=w120-h120-l90-rj"
    },
    {
        _id: "8B3Pz_2H6H8",
        title: "Good Days",
        artist: "SZA",
        duration: 280000,
        thumbnailUrl: "https://lh3.googleusercontent.com/F_Y4qALxX0jQSbC_bXNdObNnS3-KlXjTbStRC9gN64gtr3xLCr6Ytdcj804-cFvM7Pfd7e9RHkUDSE_v=w120-h120-l90-rj"
    },
    {
        _id: "7GOFTXLSvMI",
        title: "Boyfriend",
        artist: "Ariana Grande",
        duration: 187000,
        thumbnailUrl: "https://lh3.googleusercontent.com/JGxdiarndH6Ed7xNQusUaiRFUNzkcStSb3fInvJzRheYbdyU9PvfOemSoaueE0nYX4We2OZLcN-TrMVM=w120-h120-l90-rj"
    },
    {
        _id: "OsfAnsMY21M",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: 204000,
        thumbnailUrl: "https://lh3.googleusercontent.com/FsKRGdJdubNmpx-f5r1GSL9vknmVtv1tAYu4WGmKZYoke-g0i5SKxRFnPY8HxIx9TEkAqMIPX6JkBplG=w120-h120-l90-rj"
    },
    {
        _id: "KPM_BYl-EaQ",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        duration: 174000,
        thumbnailUrl: "https://lh3.googleusercontent.com/S81rF7hb7asyWLPyVpaUmHUlUrdY-2yWh4R-OYUiaT-rLNf3z-ipKX_A1z6YDKeqaXph7iP38h73QGE=w120-h120-l90-rj"
    },
    {
        _id: "QDQYVFQGkkw",
        title: "Hold On",
        artist: "Justin Bieber",
        duration: 171000,
        thumbnailUrl: "https://lh3.googleusercontent.com/lDDamgMBjF1o8ocsdDwoRPo-zuSaHNI3aGeyMpJO_AjNE6HAPZFyJ39wh-A2ySnx2XyPECOQb1HLKn3G=w120-h120-l90-rj"
    },
    {
        _id: "vy0O0okHiXs",
        title: "Saturday Nights",
        artist: "Khalid",
        duration: 211000,
        thumbnailUrl: "https://lh3.googleusercontent.com/xG9egcerwfZhsLfe4kQ4mjGdhP7Yj6m43Tomsmg9dEfCeBKGe1f4CDE0I5XqYroh7n-Q2awuYq67Jmo=w120-h120-l90-rj"
    },
    {
        _id: "pHw5jgsE_pY",
        title: "deja vu",
        artist: "Olivia Rodrigo",
        duration: 216000,
        thumbnailUrl: "https://lh3.googleusercontent.com/-GF5jStF-HFmg6bWDY0j9vB--4F0GXBwoGgn5Pe0u3TlltUqFISBip0Y4mYbzYPjaFX97TmZVBw03o1h=w120-h120-l90-rj"
    },
    {
        _id: "51m9MBishWY",
        title: "i'm so tired...",
        artist: "Lauv",
        duration: 163000,
        thumbnailUrl: "https://lh3.googleusercontent.com/IqonxJehJmXfSSjCBrvJS7cJB5dqxBZ0HN7T5PXeQT-uUltGIE3PZ_7RSiKhZYaZq2af934rhyEmFtot=w120-h120-l90-rj"
    },
    {
        _id: "qxrMpCMdYwk",
        title: "willow",
        artist: "Taylor Swift",
        duration: 215000,
        thumbnailUrl: "https://lh3.googleusercontent.com/bwzsAqLcL50V9soJS0kIXARXFqK-0XnKF9uiBtk566D03JNGUsS6l2qu2bhsAbjAp4IHOvaSyWLSJ_Y=w120-h120-l90-rj"
    },
    {
        _id: "4EQkYVtE-28",
        title: "Circles",
        artist: "Post Malone",
        duration: 216000,
        thumbnailUrl: "https://lh3.googleusercontent.com/YoQ-A-GOpgeE8tgdF3Rcf5z9V8NIIKjLH6_7X3QphIQUwVHioLu7Ik2wQzU0oCkyNm1TeLDLDYvomJ8=w120-h120-l90-rj"
    }

];

export {
    dummyData
};