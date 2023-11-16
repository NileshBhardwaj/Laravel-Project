<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .h1,
        h1 {
            font-size: 36px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            background-color: #80808024;
            font-size: 40px;
            margin-bottom: 34px;
        }

        #container {
            background-color: #fff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 50%;
        }

        #container2 {
            background-color: #fff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 50%;
        }

        #main-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 53px;
        }

        #second-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 53px;
            margin-bottom: 48px;
        }

        #third-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 53px;
            margin-bottom: 48px;
        }

        #fourth-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 53px;
            margin-bottom: 48px;
        }

        #body {
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            justify-content: center;
            margin-left: 247px;
        }

        #url {
            border-radius: 15px;
            font-size: 17px;
            margin-right: 2px;
            font-size: 17px;
            border-color: darkturquoise;
            width: 330px;
            height: 42px;
        }

        #error {
            color: red;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-right: 188px;
        }

        #loader {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 3;
            /* Changed from 1 to 3 */
            width: 150px;
            height: 150px;
            margin: -75px 0 0 -75px;
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
            display: none;
            /* Hidden by default */
        }

        #overlay {
            position: fixed;
            /* Sit on top of the page content */
            display: none;
            /* Hidden by default */
            width: 100%;
            /* Full width (cover the whole page) */
            height: 100%;
            /* Full height (cover the whole page) */
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            /* Black background with opacity */
            z-index: 2;
            /* Specify a stack order in case you're using a different order for other elements */
        }

        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }


        .bar {
            display: flex;
            width: 32%;
            height: 5px;
        }

        .segment {
            height: 100%;
        }

        .div {
            margin-top: 40px;
            margin-bottom: 36px;
        }

        .segment {
            width: 99.3552%;
            background-color: #a0e5a0fc;
        }

        /* .h3, h3 {
    font-size: 21px;
} */

        h4#result {
            background-color: azure;
            margin-top: 28px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            font-size: 25px;
        }

        #progress-bar {
            width: 100%;
            height: 20px;
            background-color: #56ff0014;
        }

        #green-section {
            height: 20px;
            background-color: green;
        }

        .circular-chart {
            display: block;
            width: 100%;
            max-width: 153px;
            margin: 10px auto;
            display: flex;
            /* flex-direction: row; */
            /* justify-content: space-evenly; */
        }

        .circle {
            fill: none;
            stroke: green;
            stroke-width: 3.8;
            stroke-dashoffset: 0;
            transition: stroke-dashoffset 1s linear;
        }

        .circle-bg {
            fill: none;
            stroke: #eee;
            stroke-width: 3.8;
        }

        .percentage {
            fill: black;
            font-size: 0.6em;
        }

        #performance {
            font-size: 27px;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .seo {
            font-size: 22px;
            color: green;
        }
    </style>


</head>

<body>
    <div id="head">
        <h1>PageSpeed Insights</h1>
    </div>
    <div id="main-container">
        <div id="container">
            <div id="body">

                <input type="text" id="url" name="url" placeholder="Enter URL"
                    style="border-radius: 15px;font-size: 17px;margin-right: 2px;font-size: 17px;">
                <button type="button" id="analyze" class="btn btn-primary"
                    style="margin-right: 39%;">Analyze</button>

            </div>
            <span id="error"></span>
            <h4 id="result"></h4>
            <div>
                <div id="cls" class="div">
                    <h3 id="cls1">Cumulative Layout Shift (CLS)</h3>
                    <div id="bar" class="bar">

                    </div>
                </div>
                <div id="tfb"class="div">
                    <h3 id="tfb1">Time to First Byte (TTFB)</h3>
                    <div id="bar2" class="bar"></div>
                </div>
                <div id="fcp"class="div">
                    <h3 id="fcp1">First Contentful Paint (FCP)</h3>
                    <div id="bar3" class="bar"></div>
                </div>
                <div id="fid"class="div">
                    <h3 id="fid1">First Input Delay (FID)</h3>
                    <div id="bar4" class="bar"></div>
                </div>
                <div id="inp"class="div">
                    <h3 id="inp1">Interaction to Next Paint (INP)</h3>
                    <div id="bar5" class="bar"></div>
                </div>
                <div id="lcp"class="div">
                    <h3 id="lcp1">Largest Contentful Paint (LCP)</h3>
                    <div id="bar6" class="bar"></div>
                </div>
                <div>
                </div>

            </div>


            <div id="overlay"></div>
            <div id="loader"></div>

        </div>
    </div>
    <div id="second-container">
        <div id="container">
            <h1>Performance</h1>
            <svg id="circle" viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="circle-bar" class="circle" stroke-dasharray="0, 100" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text id="percentage-text" x="18" y="20" text-anchor="middle" alignment-baseline="middle"
                    class="percentage">0%</text>
            </svg>
        </div>



    </div>
    <div id="third-container">
        <div id="container">
            <h1>SEO</h1>
            <svg id="circle" viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="circle-bar" class="circle" stroke-dasharray="91, 100" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text id="percentage-text" x="18" y="20" text-anchor="middle" alignment-baseline="middle"
                    class="percentage">99%</text>
            </svg>
            <span id="1st" class="seo"></span>
            <span id="2nd"class="seo"></span>
            <span id="3rd"class="seo"></span>

        </div>



    </div>
    <div id="fourth-container">
        <div id="container">
            <h1>Best Practice</h1>
            <svg id="circle" viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="circle-bar" class="circle" stroke-dasharray="91, 100" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text id="percentage-text" x="18" y="20" text-anchor="middle" alignment-baseline="middle"
                    class="percentage">98%</text>
            </svg>
        </div>
        



    </div>





    <script src="{{ asset('js/pagespeed.js') }}"></script>
</body>

</html>
