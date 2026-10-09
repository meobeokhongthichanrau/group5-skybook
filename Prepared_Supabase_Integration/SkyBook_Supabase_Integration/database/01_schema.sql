-- SkyBook educational demo. Run once in a separate demo project/schema.
-- Does not drop, alter or migrate the existing application's tables.
-- All external Inventory/Gateway outcomes below are SIMULATED.
begin;
create schema skybook_demo;
-- Locale-independent Unicode 15.0.0 letter validation.
-- NFC normalizes decomposed accents. Range classification matches name-validation.mjs.
create function skybook_demo.valid_name(p text) returns boolean
language sql immutable set search_path = '' as $name$
 select p is not null and char_length(normalize(btrim(p), NFC)) between 2 and 255
 and exists(select 1 from regexp_split_to_table(normalize(btrim(p), NFC),'') as c(ch)
            where ascii(ch) <@ '{[65,91),[97,123),[170,171),[181,182),[186,187),[192,215),[216,247),[248,706),[710,722),[736,741),[748,749),[750,751),[880,885),[886,888),[890,894),[895,896),[902,903),[904,907),[908,909),[910,930),[931,1014),[1015,1154),[1162,1328),[1329,1367),[1369,1370),[1376,1417),[1488,1515),[1519,1523),[1568,1611),[1646,1648),[1649,1748),[1749,1750),[1765,1767),[1774,1776),[1786,1789),[1791,1792),[1808,1809),[1810,1840),[1869,1958),[1969,1970),[1994,2027),[2036,2038),[2042,2043),[2048,2070),[2074,2075),[2084,2085),[2088,2089),[2112,2137),[2144,2155),[2160,2184),[2185,2191),[2208,2250),[2308,2362),[2365,2366),[2384,2385),[2392,2402),[2417,2433),[2437,2445),[2447,2449),[2451,2473),[2474,2481),[2482,2483),[2486,2490),[2493,2494),[2510,2511),[2524,2526),[2527,2530),[2544,2546),[2556,2557),[2565,2571),[2575,2577),[2579,2601),[2602,2609),[2610,2612),[2613,2615),[2616,2618),[2649,2653),[2654,2655),[2674,2677),[2693,2702),[2703,2706),[2707,2729),[2730,2737),[2738,2740),[2741,2746),[2749,2750),[2768,2769),[2784,2786),[2809,2810),[2821,2829),[2831,2833),[2835,2857),[2858,2865),[2866,2868),[2869,2874),[2877,2878),[2908,2910),[2911,2914),[2929,2930),[2947,2948),[2949,2955),[2958,2961),[2962,2966),[2969,2971),[2972,2973),[2974,2976),[2979,2981),[2984,2987),[2990,3002),[3024,3025),[3077,3085),[3086,3089),[3090,3113),[3114,3130),[3133,3134),[3160,3163),[3165,3166),[3168,3170),[3200,3201),[3205,3213),[3214,3217),[3218,3241),[3242,3252),[3253,3258),[3261,3262),[3293,3295),[3296,3298),[3313,3315),[3332,3341),[3342,3345),[3346,3387),[3389,3390),[3406,3407),[3412,3415),[3423,3426),[3450,3456),[3461,3479),[3482,3506),[3507,3516),[3517,3518),[3520,3527),[3585,3633),[3634,3636),[3648,3655),[3713,3715),[3716,3717),[3718,3723),[3724,3748),[3749,3750),[3751,3761),[3762,3764),[3773,3774),[3776,3781),[3782,3783),[3804,3808),[3840,3841),[3904,3912),[3913,3949),[3976,3981),[4096,4139),[4159,4160),[4176,4182),[4186,4190),[4193,4194),[4197,4199),[4206,4209),[4213,4226),[4238,4239),[4256,4294),[4295,4296),[4301,4302),[4304,4347),[4348,4681),[4682,4686),[4688,4695),[4696,4697),[4698,4702),[4704,4745),[4746,4750),[4752,4785),[4786,4790),[4792,4799),[4800,4801),[4802,4806),[4808,4823),[4824,4881),[4882,4886),[4888,4955),[4992,5008),[5024,5110),[5112,5118),[5121,5741),[5743,5760),[5761,5787),[5792,5867),[5873,5881),[5888,5906),[5919,5938),[5952,5970),[5984,5997),[5998,6001),[6016,6068),[6103,6104),[6108,6109),[6176,6265),[6272,6277),[6279,6313),[6314,6315),[6320,6390),[6400,6431),[6480,6510),[6512,6517),[6528,6572),[6576,6602),[6656,6679),[6688,6741),[6823,6824),[6917,6964),[6981,6989),[7043,7073),[7086,7088),[7098,7142),[7168,7204),[7245,7248),[7258,7294),[7296,7305),[7312,7355),[7357,7360),[7401,7405),[7406,7412),[7413,7415),[7418,7419),[7424,7616),[7680,7958),[7960,7966),[7968,8006),[8008,8014),[8016,8024),[8025,8026),[8027,8028),[8029,8030),[8031,8062),[8064,8117),[8118,8125),[8126,8127),[8130,8133),[8134,8141),[8144,8148),[8150,8156),[8160,8173),[8178,8181),[8182,8189),[8305,8306),[8319,8320),[8336,8349),[8450,8451),[8455,8456),[8458,8468),[8469,8470),[8473,8478),[8484,8485),[8486,8487),[8488,8489),[8490,8494),[8495,8506),[8508,8512),[8517,8522),[8526,8527),[8579,8581),[11264,11493),[11499,11503),[11506,11508),[11520,11558),[11559,11560),[11565,11566),[11568,11624),[11631,11632),[11648,11671),[11680,11687),[11688,11695),[11696,11703),[11704,11711),[11712,11719),[11720,11727),[11728,11735),[11736,11743),[11823,11824),[12293,12295),[12337,12342),[12347,12349),[12353,12439),[12445,12448),[12449,12539),[12540,12544),[12549,12592),[12593,12687),[12704,12736),[12784,12800),[13312,19904),[19968,42125),[42192,42238),[42240,42509),[42512,42528),[42538,42540),[42560,42607),[42623,42654),[42656,42726),[42775,42784),[42786,42889),[42891,42955),[42960,42962),[42963,42964),[42965,42970),[42994,43010),[43011,43014),[43015,43019),[43020,43043),[43072,43124),[43138,43188),[43250,43256),[43259,43260),[43261,43263),[43274,43302),[43312,43335),[43360,43389),[43396,43443),[43471,43472),[43488,43493),[43494,43504),[43514,43519),[43520,43561),[43584,43587),[43588,43596),[43616,43639),[43642,43643),[43646,43696),[43697,43698),[43701,43703),[43705,43710),[43712,43713),[43714,43715),[43739,43742),[43744,43755),[43762,43765),[43777,43783),[43785,43791),[43793,43799),[43808,43815),[43816,43823),[43824,43867),[43868,43882),[43888,44003),[44032,55204),[55216,55239),[55243,55292),[63744,64110),[64112,64218),[64256,64263),[64275,64280),[64285,64286),[64287,64297),[64298,64311),[64312,64317),[64318,64319),[64320,64322),[64323,64325),[64326,64434),[64467,64830),[64848,64912),[64914,64968),[65008,65020),[65136,65141),[65142,65277),[65313,65339),[65345,65371),[65382,65471),[65474,65480),[65482,65488),[65490,65496),[65498,65501),[65536,65548),[65549,65575),[65576,65595),[65596,65598),[65599,65614),[65616,65630),[65664,65787),[66176,66205),[66208,66257),[66304,66336),[66349,66369),[66370,66378),[66384,66422),[66432,66462),[66464,66500),[66504,66512),[66560,66718),[66736,66772),[66776,66812),[66816,66856),[66864,66916),[66928,66939),[66940,66955),[66956,66963),[66964,66966),[66967,66978),[66979,66994),[66995,67002),[67003,67005),[67072,67383),[67392,67414),[67424,67432),[67456,67462),[67463,67505),[67506,67515),[67584,67590),[67592,67593),[67594,67638),[67639,67641),[67644,67645),[67647,67670),[67680,67703),[67712,67743),[67808,67827),[67828,67830),[67840,67862),[67872,67898),[67968,68024),[68030,68032),[68096,68097),[68112,68116),[68117,68120),[68121,68150),[68192,68221),[68224,68253),[68288,68296),[68297,68325),[68352,68406),[68416,68438),[68448,68467),[68480,68498),[68608,68681),[68736,68787),[68800,68851),[68864,68900),[69248,69290),[69296,69298),[69376,69405),[69415,69416),[69424,69446),[69488,69506),[69552,69573),[69600,69623),[69635,69688),[69745,69747),[69749,69750),[69763,69808),[69840,69865),[69891,69927),[69956,69957),[69959,69960),[69968,70003),[70006,70007),[70019,70067),[70081,70085),[70106,70107),[70108,70109),[70144,70162),[70163,70188),[70207,70209),[70272,70279),[70280,70281),[70282,70286),[70287,70302),[70303,70313),[70320,70367),[70405,70413),[70415,70417),[70419,70441),[70442,70449),[70450,70452),[70453,70458),[70461,70462),[70480,70481),[70493,70498),[70656,70709),[70727,70731),[70751,70754),[70784,70832),[70852,70854),[70855,70856),[71040,71087),[71128,71132),[71168,71216),[71236,71237),[71296,71339),[71352,71353),[71424,71451),[71488,71495),[71680,71724),[71840,71904),[71935,71943),[71945,71946),[71948,71956),[71957,71959),[71960,71984),[71999,72000),[72001,72002),[72096,72104),[72106,72145),[72161,72162),[72163,72164),[72192,72193),[72203,72243),[72250,72251),[72272,72273),[72284,72330),[72349,72350),[72368,72441),[72704,72713),[72714,72751),[72768,72769),[72818,72848),[72960,72967),[72968,72970),[72971,73009),[73030,73031),[73056,73062),[73063,73065),[73066,73098),[73112,73113),[73440,73459),[73474,73475),[73476,73489),[73490,73524),[73648,73649),[73728,74650),[74880,75076),[77712,77809),[77824,78896),[78913,78919),[82944,83527),[92160,92729),[92736,92767),[92784,92863),[92880,92910),[92928,92976),[92992,92996),[93027,93048),[93053,93072),[93760,93824),[93952,94027),[94032,94033),[94099,94112),[94176,94178),[94179,94180),[94208,100344),[100352,101590),[101632,101641),[110576,110580),[110581,110588),[110589,110591),[110592,110883),[110898,110899),[110928,110931),[110933,110934),[110948,110952),[110960,111356),[113664,113771),[113776,113789),[113792,113801),[113808,113818),[119808,119893),[119894,119965),[119966,119968),[119970,119971),[119973,119975),[119977,119981),[119982,119994),[119995,119996),[119997,120004),[120005,120070),[120071,120075),[120077,120085),[120086,120093),[120094,120122),[120123,120127),[120128,120133),[120134,120135),[120138,120145),[120146,120486),[120488,120513),[120514,120539),[120540,120571),[120572,120597),[120598,120629),[120630,120655),[120656,120687),[120688,120713),[120714,120745),[120746,120771),[120772,120780),[122624,122655),[122661,122667),[122928,122990),[123136,123181),[123191,123198),[123214,123215),[123536,123566),[123584,123628),[124112,124140),[124896,124903),[124904,124908),[124909,124911),[124912,124927),[124928,125125),[125184,125252),[125259,125260),[126464,126468),[126469,126496),[126497,126499),[126500,126501),[126503,126504),[126505,126515),[126516,126520),[126521,126522),[126523,126524),[126530,126531),[126535,126536),[126537,126538),[126539,126540),[126541,126544),[126545,126547),[126548,126549),[126551,126552),[126553,126554),[126555,126556),[126557,126558),[126559,126560),[126561,126563),[126564,126565),[126567,126571),[126572,126579),[126580,126584),[126585,126589),[126590,126591),[126592,126602),[126603,126620),[126625,126628),[126629,126634),[126635,126652),[131072,173792),[173824,177978),[177984,178206),[178208,183970),[183984,191457),[194560,195102),[196608,201547),[201552,205744)}'::int4multirange)
 and not exists(select 1 from regexp_split_to_table(normalize(btrim(p), NFC),'') as c(ch)
                where ch not in (' ','''', '’', '-') and not (ascii(ch) <@ '{[65,91),[97,123),[170,171),[181,182),[186,187),[192,215),[216,247),[248,706),[710,722),[736,741),[748,749),[750,751),[880,885),[886,888),[890,894),[895,896),[902,903),[904,907),[908,909),[910,930),[931,1014),[1015,1154),[1162,1328),[1329,1367),[1369,1370),[1376,1417),[1488,1515),[1519,1523),[1568,1611),[1646,1648),[1649,1748),[1749,1750),[1765,1767),[1774,1776),[1786,1789),[1791,1792),[1808,1809),[1810,1840),[1869,1958),[1969,1970),[1994,2027),[2036,2038),[2042,2043),[2048,2070),[2074,2075),[2084,2085),[2088,2089),[2112,2137),[2144,2155),[2160,2184),[2185,2191),[2208,2250),[2308,2362),[2365,2366),[2384,2385),[2392,2402),[2417,2433),[2437,2445),[2447,2449),[2451,2473),[2474,2481),[2482,2483),[2486,2490),[2493,2494),[2510,2511),[2524,2526),[2527,2530),[2544,2546),[2556,2557),[2565,2571),[2575,2577),[2579,2601),[2602,2609),[2610,2612),[2613,2615),[2616,2618),[2649,2653),[2654,2655),[2674,2677),[2693,2702),[2703,2706),[2707,2729),[2730,2737),[2738,2740),[2741,2746),[2749,2750),[2768,2769),[2784,2786),[2809,2810),[2821,2829),[2831,2833),[2835,2857),[2858,2865),[2866,2868),[2869,2874),[2877,2878),[2908,2910),[2911,2914),[2929,2930),[2947,2948),[2949,2955),[2958,2961),[2962,2966),[2969,2971),[2972,2973),[2974,2976),[2979,2981),[2984,2987),[2990,3002),[3024,3025),[3077,3085),[3086,3089),[3090,3113),[3114,3130),[3133,3134),[3160,3163),[3165,3166),[3168,3170),[3200,3201),[3205,3213),[3214,3217),[3218,3241),[3242,3252),[3253,3258),[3261,3262),[3293,3295),[3296,3298),[3313,3315),[3332,3341),[3342,3345),[3346,3387),[3389,3390),[3406,3407),[3412,3415),[3423,3426),[3450,3456),[3461,3479),[3482,3506),[3507,3516),[3517,3518),[3520,3527),[3585,3633),[3634,3636),[3648,3655),[3713,3715),[3716,3717),[3718,3723),[3724,3748),[3749,3750),[3751,3761),[3762,3764),[3773,3774),[3776,3781),[3782,3783),[3804,3808),[3840,3841),[3904,3912),[3913,3949),[3976,3981),[4096,4139),[4159,4160),[4176,4182),[4186,4190),[4193,4194),[4197,4199),[4206,4209),[4213,4226),[4238,4239),[4256,4294),[4295,4296),[4301,4302),[4304,4347),[4348,4681),[4682,4686),[4688,4695),[4696,4697),[4698,4702),[4704,4745),[4746,4750),[4752,4785),[4786,4790),[4792,4799),[4800,4801),[4802,4806),[4808,4823),[4824,4881),[4882,4886),[4888,4955),[4992,5008),[5024,5110),[5112,5118),[5121,5741),[5743,5760),[5761,5787),[5792,5867),[5873,5881),[5888,5906),[5919,5938),[5952,5970),[5984,5997),[5998,6001),[6016,6068),[6103,6104),[6108,6109),[6176,6265),[6272,6277),[6279,6313),[6314,6315),[6320,6390),[6400,6431),[6480,6510),[6512,6517),[6528,6572),[6576,6602),[6656,6679),[6688,6741),[6823,6824),[6917,6964),[6981,6989),[7043,7073),[7086,7088),[7098,7142),[7168,7204),[7245,7248),[7258,7294),[7296,7305),[7312,7355),[7357,7360),[7401,7405),[7406,7412),[7413,7415),[7418,7419),[7424,7616),[7680,7958),[7960,7966),[7968,8006),[8008,8014),[8016,8024),[8025,8026),[8027,8028),[8029,8030),[8031,8062),[8064,8117),[8118,8125),[8126,8127),[8130,8133),[8134,8141),[8144,8148),[8150,8156),[8160,8173),[8178,8181),[8182,8189),[8305,8306),[8319,8320),[8336,8349),[8450,8451),[8455,8456),[8458,8468),[8469,8470),[8473,8478),[8484,8485),[8486,8487),[8488,8489),[8490,8494),[8495,8506),[8508,8512),[8517,8522),[8526,8527),[8579,8581),[11264,11493),[11499,11503),[11506,11508),[11520,11558),[11559,11560),[11565,11566),[11568,11624),[11631,11632),[11648,11671),[11680,11687),[11688,11695),[11696,11703),[11704,11711),[11712,11719),[11720,11727),[11728,11735),[11736,11743),[11823,11824),[12293,12295),[12337,12342),[12347,12349),[12353,12439),[12445,12448),[12449,12539),[12540,12544),[12549,12592),[12593,12687),[12704,12736),[12784,12800),[13312,19904),[19968,42125),[42192,42238),[42240,42509),[42512,42528),[42538,42540),[42560,42607),[42623,42654),[42656,42726),[42775,42784),[42786,42889),[42891,42955),[42960,42962),[42963,42964),[42965,42970),[42994,43010),[43011,43014),[43015,43019),[43020,43043),[43072,43124),[43138,43188),[43250,43256),[43259,43260),[43261,43263),[43274,43302),[43312,43335),[43360,43389),[43396,43443),[43471,43472),[43488,43493),[43494,43504),[43514,43519),[43520,43561),[43584,43587),[43588,43596),[43616,43639),[43642,43643),[43646,43696),[43697,43698),[43701,43703),[43705,43710),[43712,43713),[43714,43715),[43739,43742),[43744,43755),[43762,43765),[43777,43783),[43785,43791),[43793,43799),[43808,43815),[43816,43823),[43824,43867),[43868,43882),[43888,44003),[44032,55204),[55216,55239),[55243,55292),[63744,64110),[64112,64218),[64256,64263),[64275,64280),[64285,64286),[64287,64297),[64298,64311),[64312,64317),[64318,64319),[64320,64322),[64323,64325),[64326,64434),[64467,64830),[64848,64912),[64914,64968),[65008,65020),[65136,65141),[65142,65277),[65313,65339),[65345,65371),[65382,65471),[65474,65480),[65482,65488),[65490,65496),[65498,65501),[65536,65548),[65549,65575),[65576,65595),[65596,65598),[65599,65614),[65616,65630),[65664,65787),[66176,66205),[66208,66257),[66304,66336),[66349,66369),[66370,66378),[66384,66422),[66432,66462),[66464,66500),[66504,66512),[66560,66718),[66736,66772),[66776,66812),[66816,66856),[66864,66916),[66928,66939),[66940,66955),[66956,66963),[66964,66966),[66967,66978),[66979,66994),[66995,67002),[67003,67005),[67072,67383),[67392,67414),[67424,67432),[67456,67462),[67463,67505),[67506,67515),[67584,67590),[67592,67593),[67594,67638),[67639,67641),[67644,67645),[67647,67670),[67680,67703),[67712,67743),[67808,67827),[67828,67830),[67840,67862),[67872,67898),[67968,68024),[68030,68032),[68096,68097),[68112,68116),[68117,68120),[68121,68150),[68192,68221),[68224,68253),[68288,68296),[68297,68325),[68352,68406),[68416,68438),[68448,68467),[68480,68498),[68608,68681),[68736,68787),[68800,68851),[68864,68900),[69248,69290),[69296,69298),[69376,69405),[69415,69416),[69424,69446),[69488,69506),[69552,69573),[69600,69623),[69635,69688),[69745,69747),[69749,69750),[69763,69808),[69840,69865),[69891,69927),[69956,69957),[69959,69960),[69968,70003),[70006,70007),[70019,70067),[70081,70085),[70106,70107),[70108,70109),[70144,70162),[70163,70188),[70207,70209),[70272,70279),[70280,70281),[70282,70286),[70287,70302),[70303,70313),[70320,70367),[70405,70413),[70415,70417),[70419,70441),[70442,70449),[70450,70452),[70453,70458),[70461,70462),[70480,70481),[70493,70498),[70656,70709),[70727,70731),[70751,70754),[70784,70832),[70852,70854),[70855,70856),[71040,71087),[71128,71132),[71168,71216),[71236,71237),[71296,71339),[71352,71353),[71424,71451),[71488,71495),[71680,71724),[71840,71904),[71935,71943),[71945,71946),[71948,71956),[71957,71959),[71960,71984),[71999,72000),[72001,72002),[72096,72104),[72106,72145),[72161,72162),[72163,72164),[72192,72193),[72203,72243),[72250,72251),[72272,72273),[72284,72330),[72349,72350),[72368,72441),[72704,72713),[72714,72751),[72768,72769),[72818,72848),[72960,72967),[72968,72970),[72971,73009),[73030,73031),[73056,73062),[73063,73065),[73066,73098),[73112,73113),[73440,73459),[73474,73475),[73476,73489),[73490,73524),[73648,73649),[73728,74650),[74880,75076),[77712,77809),[77824,78896),[78913,78919),[82944,83527),[92160,92729),[92736,92767),[92784,92863),[92880,92910),[92928,92976),[92992,92996),[93027,93048),[93053,93072),[93760,93824),[93952,94027),[94032,94033),[94099,94112),[94176,94178),[94179,94180),[94208,100344),[100352,101590),[101632,101641),[110576,110580),[110581,110588),[110589,110591),[110592,110883),[110898,110899),[110928,110931),[110933,110934),[110948,110952),[110960,111356),[113664,113771),[113776,113789),[113792,113801),[113808,113818),[119808,119893),[119894,119965),[119966,119968),[119970,119971),[119973,119975),[119977,119981),[119982,119994),[119995,119996),[119997,120004),[120005,120070),[120071,120075),[120077,120085),[120086,120093),[120094,120122),[120123,120127),[120128,120133),[120134,120135),[120138,120145),[120146,120486),[120488,120513),[120514,120539),[120540,120571),[120572,120597),[120598,120629),[120630,120655),[120656,120687),[120688,120713),[120714,120745),[120746,120771),[120772,120780),[122624,122655),[122661,122667),[122928,122990),[123136,123181),[123191,123198),[123214,123215),[123536,123566),[123584,123628),[124112,124140),[124896,124903),[124904,124908),[124909,124911),[124912,124927),[124928,125125),[125184,125252),[125259,125260),[126464,126468),[126469,126496),[126497,126499),[126500,126501),[126503,126504),[126505,126515),[126516,126520),[126521,126522),[126523,126524),[126530,126531),[126535,126536),[126537,126538),[126539,126540),[126541,126544),[126545,126547),[126548,126549),[126551,126552),[126553,126554),[126555,126556),[126557,126558),[126559,126560),[126561,126563),[126564,126565),[126567,126571),[126572,126579),[126580,126584),[126585,126589),[126590,126591),[126592,126602),[126603,126620),[126625,126628),[126629,126634),[126635,126652),[131072,173792),[173824,177978),[177984,178206),[178208,183970),[183984,191457),[194560,195102),[196608,201547),[201552,205744)}'::int4multirange));
$name$;


create table skybook_demo.customer (
 customer_id uuid primary key references auth.users(id),
 idp_subject text not null unique,
 full_name varchar(255) not null check(skybook_demo.valid_name(full_name))
);
create table skybook_demo.flight (
 flight_id uuid primary key default gen_random_uuid(),
 flight_number varchar(16) not null,
 origin char(3) not null, destination char(3) not null,
 departure_time timestamptz not null,
 capacity integer not null check(capacity > 0),
 basic_vnd numeric(18,0) not null check(basic_vnd > 0),
 flex_vnd numeric(18,0) not null check(flex_vnd >= basic_vnd),
 check(origin <> destination)
);
create table skybook_demo.booking (
 booking_id uuid primary key default gen_random_uuid(),
 customer_id uuid not null references skybook_demo.customer,
 flight_id uuid not null references skybook_demo.flight,
 status varchar(24) not null check(status in ('INITIATED','PENDING_PAYMENT','CONFIRMED','EXPIRED','CANCELLED')),
 hold_request_key uuid not null unique,
 request_payload jsonb not null,
 hold_ref varchar(100) unique, hold_expiry timestamptz,
 booker_full_name varchar(255) not null check(skybook_demo.valid_name(booker_full_name)), booker_dob date not null,
 booker_email varchar(255) not null, booker_phone varchar(32) not null,
 fare_class varchar(24) not null check(fare_class in ('Economy Basic','Economy Flex')),
 seat_count integer not null check(seat_count between 1 and 9),
 total_vnd numeric(18,0) not null check(total_vnd > 0),
 pnr char(6) unique check(pnr is null or pnr ~ '^[A-HJ-NP-Z2-9]{6}$'), cancellation_reason varchar(100),
 inventory_commit_ref varchar(100),
 evidence_mode text not null default 'SIMULATED_SERVICES' check(evidence_mode = 'SIMULATED_SERVICES'),
 created_at timestamptz not null default now(),
 check(status not in ('PENDING_PAYMENT','CONFIRMED') or (hold_ref is not null and hold_expiry is not null)),
 check(status <> 'CONFIRMED' or (pnr is not null and inventory_commit_ref is not null))
);
create index booking_flight_capacity on skybook_demo.booking(flight_id,status,hold_expiry);
create table skybook_demo.passenger (
 passenger_id uuid primary key default gen_random_uuid(),
 booking_id uuid not null references skybook_demo.booking,
 full_name varchar(255) not null check(skybook_demo.valid_name(full_name)), dob date not null,
 email varchar(255) not null, phone varchar(32) not null,
 seat_number varchar(8), is_infant boolean not null,
 check(not is_infant or seat_number is null)
);
create index passenger_booking on skybook_demo.passenger(booking_id);
create table skybook_demo.payment (
 payment_id uuid primary key default gen_random_uuid(),
 booking_id uuid not null unique references skybook_demo.booking,
 status varchar(20) not null check(status in ('PENDING','SUCCESS')),
 total_amount numeric(18,0) not null check(total_amount > 0),
 currency char(3) not null default 'VND' check(currency = 'VND'),
 evidence_mode text not null default 'SIMULATED' check(evidence_mode = 'SIMULATED')
);
create table skybook_demo.payment_attempt (
 attempt_id uuid primary key default gen_random_uuid(),
 payment_id uuid not null references skybook_demo.payment,
 gateway_ref varchar(100), idempotency_key uuid not null unique,
 status varchar(24) not null check(status in ('PENDING','PAYMENT_UNKNOWN','SUCCESS','DECLINED')),
 attempt_time timestamptz not null default now()
);
create table skybook_demo.refund (
 refund_id uuid primary key default gen_random_uuid(),
 payment_id uuid not null unique references skybook_demo.payment,
 amount numeric(18,0) not null check(amount >= 0),
 refund_operation_key uuid not null unique,
 status varchar(20) not null check(status in ('REQUESTED','PROCESSING','UNKNOWN','SUCCEEDED','FAILED'))
);
-- Refund table is schema-only in this MVP. Zero balance needs no provider money operation.

-- Cross-table constraints use a locked captured Payment, not a browser-supplied limit.
create function skybook_demo.check_refund_cap() returns trigger
language plpgsql security definer set search_path = '' as $$
declare captured skybook_demo.payment;
begin
 select * into captured from skybook_demo.payment where payment_id=new.payment_id for update;
 if not found or captured.status<>'SUCCESS' then
  raise exception 'Refund requires a successful captured Payment' using errcode='23514'; end if;
 if new.amount<0 or new.amount>captured.total_amount then
  raise exception 'Refund outside captured amount' using errcode='23514'; end if;
 return new;
end; $$;
create trigger refund_cap before insert or update of amount,payment_id on skybook_demo.refund
 for each row execute function skybook_demo.check_refund_cap();
create function skybook_demo.protect_captured_payment() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 if exists(select 1 from skybook_demo.refund r where r.payment_id=old.payment_id
           and (new.status<>'SUCCESS' or r.amount>new.total_amount)) then
  raise exception 'Payment update violates existing refund' using errcode='23514'; end if;
 return new;
end; $$;
create trigger payment_refund_guard before update of status,total_amount on skybook_demo.payment
 for each row execute function skybook_demo.protect_captured_payment();

-- Deferred count constraints see the complete transaction, including child inserts.
create function skybook_demo.check_child_count() returns trigger
language plpgsql security definer set search_path = '' as $$
declare keys uuid[]; k uuid; n integer;
begin
 if tg_table_name='booking' then keys:=array[new.booking_id];
 elsif tg_table_name='passenger' then
  if tg_op='INSERT' then keys:=array[new.booking_id];
  elsif tg_op='DELETE' then keys:=array[old.booking_id];
  else keys:=array[old.booking_id,new.booking_id]; end if;
 elsif tg_table_name='payment' then keys:=array[new.payment_id];
 else
  if tg_op='INSERT' then keys:=array[new.payment_id];
  elsif tg_op='DELETE' then keys:=array[old.payment_id];
  else keys:=array[old.payment_id,new.payment_id]; end if;
 end if;
 foreach k in array keys loop
  if tg_table_name in ('booking','passenger') then
   perform 1 from skybook_demo.booking b where b.booking_id=k for update;
   if found then
    select count(*) into n from skybook_demo.passenger where booking_id=k;
    if n not between 1 and 9 then raise exception 'Booking requires 1-9 passengers' using errcode='23514'; end if;
   end if;
  else
   perform 1 from skybook_demo.payment p where p.payment_id=k for update;
   if found then
    select count(*) into n from skybook_demo.payment_attempt where payment_id=k;
    if n<1 then raise exception 'Payment requires at least one attempt' using errcode='23514'; end if;
   end if;
  end if;
 end loop;
 return null;
end; $$;
create constraint trigger booking_child_count after insert or update on skybook_demo.booking
 deferrable initially deferred for each row execute function skybook_demo.check_child_count();
create constraint trigger passenger_child_count after insert or update or delete on skybook_demo.passenger
 deferrable initially deferred for each row execute function skybook_demo.check_child_count();
create constraint trigger payment_child_count after insert or update on skybook_demo.payment
 deferrable initially deferred for each row execute function skybook_demo.check_child_count();
create constraint trigger attempt_child_count after insert or update or delete on skybook_demo.payment_attempt
 deferrable initially deferred for each row execute function skybook_demo.check_child_count();


alter table skybook_demo.customer enable row level security;
alter table skybook_demo.flight enable row level security;
alter table skybook_demo.booking enable row level security;
alter table skybook_demo.passenger enable row level security;
alter table skybook_demo.payment enable row level security;
alter table skybook_demo.payment_attempt enable row level security;
alter table skybook_demo.refund enable row level security;
revoke all on all tables in schema skybook_demo from public, anon, authenticated;
grant usage on schema skybook_demo to anon, authenticated;
grant select on skybook_demo.flight to anon, authenticated;
grant select on skybook_demo.customer, skybook_demo.booking, skybook_demo.passenger,
 skybook_demo.payment, skybook_demo.payment_attempt, skybook_demo.refund to authenticated;
create policy flight_read on skybook_demo.flight for select to anon,authenticated using(true);
create policy customer_owner on skybook_demo.customer for select to authenticated using(customer_id = (select auth.uid()));
create policy booking_owner on skybook_demo.booking for select to authenticated using(customer_id = (select auth.uid()));
create policy passenger_owner on skybook_demo.passenger for select to authenticated
 using(exists(select 1 from skybook_demo.booking b where b.booking_id = passenger.booking_id and b.customer_id = (select auth.uid())));
create policy payment_owner on skybook_demo.payment for select to authenticated
 using(exists(select 1 from skybook_demo.booking b where b.booking_id = payment.booking_id and b.customer_id = (select auth.uid())));
create policy attempt_owner on skybook_demo.payment_attempt for select to authenticated
 using(exists(select 1 from skybook_demo.payment p join skybook_demo.booking b using(booking_id) where p.payment_id = payment_attempt.payment_id and b.customer_id = (select auth.uid())));
create policy refund_owner on skybook_demo.refund for select to authenticated
 using(exists(select 1 from skybook_demo.payment p join skybook_demo.booking b using(booking_id) where p.payment_id = refund.payment_id and b.customer_id = (select auth.uid())));

-- Internal helpers are not callable by browser roles.
create function skybook_demo.valid_contact(p jsonb, reference_date date) returns boolean
language plpgsql immutable set search_path = '' as $$
declare birth date;
begin
 if jsonb_typeof(p) is distinct from 'object' then return false; end if;
 if not skybook_demo.valid_name(p->>'full_name')
  or coalesce(p->>'email','') !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  or length(coalesce(p->>'email','')) > 255
  or coalesce(p->>'phone','') !~ '^\+?[0-9 ()-]{7,32}$'
  or length(regexp_replace(coalesce(p->>'phone',''),'[^0-9]','','g')) < 7
  or coalesce(p->>'dob','') !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then return false; end if;
 begin birth := (p->>'dob')::date; exception when others then return false; end;
 return birth between date '1900-01-01' and reference_date;
end; $$;
create function skybook_demo.booking_json(p_id uuid) returns jsonb
language sql stable set search_path = '' as $$
 select to_jsonb(b) - 'request_payload' || jsonb_build_object(
  'travelers',coalesce((select jsonb_agg(to_jsonb(p) order by p.passenger_id) from skybook_demo.passenger p where p.booking_id=b.booking_id),'[]'::jsonb),
  'payment', (select to_jsonb(m) from skybook_demo.payment m where m.booking_id=b.booking_id))
 from skybook_demo.booking b where b.booking_id=p_id;
$$;
revoke all on all functions in schema skybook_demo from public,anon,authenticated;

create function public.skybook_list_flights() returns jsonb
language sql stable security definer set search_path = '' as $$
 select coalesce(jsonb_agg(to_jsonb(f) order by f.departure_time),'[]'::jsonb)
 from skybook_demo.flight f where f.departure_time > now();
$$;

-- One transaction creates customer snapshot, booking, travelers and a simulated hold.
-- The same request key and payload returns the original booking, including after lost ACK.
create function public.skybook_create_booking(p_request_key uuid,p_flight_id uuid,p_fare_class text,p_booker jsonb,p_travelers jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); b skybook_demo.booking; f skybook_demo.flight;
 payload jsonb; t jsonb; seats integer:=0; infants integer:=0; adults integer:=0;
 used_seats integer; birth date; travel_day date; checkout_day date;
begin
 if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
 if p_request_key is null then raise exception 'Request key required' using errcode='22023'; end if;
 payload := jsonb_build_object('flight_id',p_flight_id,'fare_class',p_fare_class,'booker',p_booker,'travelers',p_travelers);
 perform pg_advisory_xact_lock(hashtextextended(p_request_key::text,0));
 select * into b from skybook_demo.booking where hold_request_key=p_request_key;
 if found then
  if b.customer_id<>uid then raise exception 'Request unavailable' using errcode='42501'; end if;
  if b.request_payload is distinct from payload then raise exception 'Request key reused with different data' using errcode='22023'; end if;
  return skybook_demo.booking_json(b.booking_id);
 end if;
 select * into f from skybook_demo.flight where flight_id=p_flight_id for update;
 if not found then raise exception 'Flight unavailable' using errcode='22023'; end if;
 checkout_day := (now() at time zone 'Asia/Ho_Chi_Minh')::date;
 travel_day := (f.departure_time at time zone 'Asia/Ho_Chi_Minh')::date;
 -- Proposed ISS-09/ISS-10 interpretations, not approved SRS policy.
 if travel_day < checkout_day+1 then raise exception 'Flight must depart on a later calendar day' using errcode='22023'; end if;
 if not skybook_demo.valid_contact(p_booker,checkout_day) or (p_booker->>'dob')::date > (checkout_day-interval '18 years')::date then
  raise exception 'Booker must have valid contact details and be at least 18' using errcode='22023'; end if;
 if p_fare_class is null or p_fare_class not in ('Economy Basic','Economy Flex') then raise exception 'Invalid fare class' using errcode='22023'; end if;
 if jsonb_typeof(p_travelers) is distinct from 'array' then raise exception 'Travelers must be an array' using errcode='22023'; end if;
 if jsonb_array_length(p_travelers) not between 1 and 9 then raise exception 'Require 1-9 travelers' using errcode='22023'; end if;
 for t in select value from jsonb_array_elements(p_travelers) loop
  if not skybook_demo.valid_contact(t,checkout_day) then raise exception 'Invalid traveler details' using errcode='22023'; end if;
  if nullif(t->>'seat_number','') is not null then raise exception 'This MVP allocates seats at check-in' using errcode='22023'; end if;
  birth := (t->>'dob')::date;
  if birth > (travel_day-interval '2 years')::date then infants:=infants+1; else seats:=seats+1; end if;
  if birth <= (travel_day-interval '18 years')::date then adults:=adults+1; end if;
 end loop;
 if infants>adults or seats<1 then raise exception 'Each infant needs an adult traveler' using errcode='22023'; end if;
 select coalesce(sum(seat_count),0) into used_seats from skybook_demo.booking
  where flight_id=p_flight_id and (status='CONFIRMED' or (status='PENDING_PAYMENT' and hold_expiry>now()));
 if used_seats+seats>f.capacity then raise exception 'No simulated inventory capacity' using errcode='22023'; end if;
 insert into skybook_demo.customer(customer_id,idp_subject,full_name) values(uid,uid::text,normalize(btrim(p_booker->>'full_name'), NFC))
  on conflict(customer_id) do update set full_name=excluded.full_name;
 insert into skybook_demo.booking(customer_id,flight_id,status,hold_request_key,request_payload,hold_ref,hold_expiry,
  booker_full_name,booker_dob,booker_email,booker_phone,fare_class,seat_count,total_vnd)
 values(uid,p_flight_id,'PENDING_PAYMENT',p_request_key,payload,'SIMULATED-HOLD-'||p_request_key::text,now()+interval '30 minutes',
  normalize(btrim(p_booker->>'full_name'), NFC),(p_booker->>'dob')::date,p_booker->>'email',p_booker->>'phone',p_fare_class,seats,
  jsonb_array_length(p_travelers)*(case when p_fare_class='Economy Flex' then f.flex_vnd else f.basic_vnd end)) returning * into b;
 for t in select value from jsonb_array_elements(p_travelers) loop
  insert into skybook_demo.passenger(booking_id,full_name,dob,email,phone,is_infant)
  values(b.booking_id,normalize(btrim(t->>'full_name'), NFC),(t->>'dob')::date,t->>'email',t->>'phone',(t->>'dob')::date>(travel_day-interval '2 years')::date);
 end loop;
 return skybook_demo.booking_json(b.booking_id);
end; $$;

create function public.skybook_get_booking(p_booking_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare b skybook_demo.booking;
begin
 select * into b from skybook_demo.booking where booking_id=p_booking_id and customer_id=auth.uid() for update;
 if not found then raise exception 'Booking unavailable' using errcode='42501'; end if;
 if b.status='PENDING_PAYMENT' and b.hold_expiry<=now() and not exists(select 1 from skybook_demo.payment p where p.booking_id=b.booking_id) then
  update skybook_demo.booking set status='EXPIRED' where booking_id=b.booking_id;
 end if;
 return skybook_demo.booking_json(b.booking_id);
end; $$;
create function public.skybook_lookup_request(p_request_key uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare bid uuid;
begin
 if auth.uid() is null then raise exception 'Authentication required' using errcode='42501'; end if;
 select booking_id into bid from skybook_demo.booking where hold_request_key=p_request_key and customer_id=auth.uid();
 if bid is null then return null; end if;
 return public.skybook_get_booking(bid);
end; $$;

-- Educational simulation only: server-owned fake Gateway SUCCESS + fake commit ACK.
-- No charge, real Inventory call, notification, ticket or refund takes place.
create function public.skybook_demo_confirm(p_booking_id uuid,p_request_key uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare b skybook_demo.booking; payid uuid; demo_pnr text; generated boolean:=false;
begin
 if auth.uid() is null or p_request_key is null then raise exception 'Authentication and key required' using errcode='42501'; end if;
 select * into b from skybook_demo.booking where booking_id=p_booking_id and customer_id=auth.uid() for update;
 if not found then raise exception 'Booking unavailable' using errcode='42501'; end if;
 if b.status='CONFIRMED' then return skybook_demo.booking_json(b.booking_id); end if;
 if b.status<>'PENDING_PAYMENT' or b.hold_expiry<=now() then raise exception 'No valid hold for demo confirmation' using errcode='22023'; end if;
 if exists(select 1 from skybook_demo.payment where booking_id=b.booking_id) then raise exception 'Money operation already exists' using errcode='22023'; end if;
 insert into skybook_demo.payment(booking_id,status,total_amount) values(b.booking_id,'SUCCESS',b.total_vnd) returning payment_id into payid;
 insert into skybook_demo.payment_attempt(payment_id,gateway_ref,idempotency_key,status)
  values(payid,'SIMULATED-GATEWAY-'||p_request_key::text,p_request_key,'SUCCESS');
 for i in 1..20 loop
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789',1+floor(random()*32)::int,1),'')
   into demo_pnr from generate_series(1,6);
  begin
   update skybook_demo.booking set status='CONFIRMED',pnr=demo_pnr,
    inventory_commit_ref='SIMULATED-COMMIT-'||p_request_key::text where booking_id=b.booking_id;
   generated:=true; exit;
  exception when unique_violation then null;
  end;
 end loop;
 if not generated then raise exception 'Could not allocate unique demo PNR'; end if;
 return skybook_demo.booking_json(b.booking_id);
end; $$;

revoke all on function public.skybook_list_flights() from public,anon,authenticated;
revoke all on function public.skybook_create_booking(uuid,uuid,text,jsonb,jsonb) from public,anon,authenticated;
revoke all on function public.skybook_get_booking(uuid) from public,anon,authenticated;
revoke all on function public.skybook_lookup_request(uuid) from public,anon,authenticated;
revoke all on function public.skybook_demo_confirm(uuid,uuid) from public,anon,authenticated;
grant execute on function public.skybook_list_flights() to anon,authenticated;
grant execute on function public.skybook_create_booking(uuid,uuid,text,jsonb,jsonb), public.skybook_get_booking(uuid),
 public.skybook_lookup_request(uuid), public.skybook_demo_confirm(uuid,uuid) to authenticated;
commit;
