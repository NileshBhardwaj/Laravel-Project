$(document).ready(function() {



    $('#second-container').hide();
    $('#third-container').hide();
    $('#fourth-container').hide();
    $('#cls1').hide();
    $('#tfb1').hide();
    $('#fcp1').hide();
    $('#fid1').hide();
    $('#inp1').hide();
    $('#lcp1').hide();

    $('#analyze').click(function() {
        var input = $("#url").val();
        console.log(input);
        console.log("user");
        if (input) {
            var my_time = new Date()
            console.log(my_time);
            // Show loader and overlay
            $("#overlay").show();
            $("#loader").show();


            $.ajax({
                url: '/analyze', // replace with your endpoint
                type: 'POST',
                data: {
                    url: $('#url').val(),
                    _token: '{{ csrf_token() }}' // Laravel CSRF Token
                },
                success: function(response) {
                    $("#error").hide();
                    var my_time = new Date()

                    var formatted_time = my_time.toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

                    console.log(formatted_time);
                    $("#result").html("Result For : " + formatted_time);
                    // Hide loader and overlay
                    $("#loader").hide();
                    $("#overlay").hide();
                    $('#cls1').show();
                    $('#tfb1').show();
                    $('#fcp1').show();
                    $('#fid1').show();
                    $('#inp1').show();
                    $('#lcp1').show();
                    $('#second-container').show();
                    $('#third-container').show();
                    $('#fourth-container').show();

                    console.log(response);
                    var data = response.loadingExperience;

                    var id = data.id;
                    console.log(id);
                    var metrics = data.metrics;
                    console.log(metrics);


                    var my = response.lighthouseResult;
                    console.log(my);
                    var accessibilityScore = my.categories;
                    console.log(accessibilityScore);

                    // document.getElementById('container').innerHTML +=
                    //     "<br>Cumulative Layout Shift (CLS): " + metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile + "<br>" +
                    //     "Time to First Byte (TTFB): " + metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile + "<br>" +
                    //     "First Contentful Paint (FCP): " + metrics.FIRST_CONTENTFUL_PAINT_MS.percentile + "<br>" +
                    //     "First Input Delay (FID): " + metrics.FIRST_INPUT_DELAY_MS.percentile + "<br>" +
                    //     "Interaction to Next Paint (INP): " + metrics.INTERACTION_TO_NEXT_PAINT.percentile + "<br>" +
                    //     "Largest Contentful Paint (LCP): " + metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile;


                    /*this section have the code about the Cumulative Layout Shift*/



                    var CUMULATIVE_LAYOUT_SHIFT_SCORE = metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE;
                    console.log(CUMULATIVE_LAYOUT_SHIFT_SCORE);

                    var time = CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile;

                    console.log(time);

                    var distribution1 = CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions;
                    console.log(distribution1);


                    var colors = ['green', 'yellow', 'red'];


                    distribution1.forEach(function(item, index) {
                        item.color = colors[index];
                    });

                    var bar = document.getElementById('bar');

                    distribution1.forEach(function(item) {
                        var segment = document.createElement('div');
                        segment.className = 'segment';
                        segment.style.width = (item.proportion * 100) + '%';
                        segment.style.backgroundColor = item.color;
                        bar.appendChild(segment);
                    });


                    if (time < 10) {
                        time = 0.01;
                    } else if (time >= 10 && time < 1000) {
                        time = time + 'ms';
                    } else {
                        time = time / 1000 + 's';
                    }

                    //
                    var timeDiv = document.createElement('span');
                    timeDiv.textContent = time;
                    timeDiv.style.color = 'green';
                    bar.appendChild(timeDiv);


                    //till here ---------------------------------------------------------------- 



                    /*this section have the code about the Time to First Byte*/
                    var FIRST_CONTENTFUL_PAINT_MS = metrics.FIRST_CONTENTFUL_PAINT_MS;
                    console.log(FIRST_CONTENTFUL_PAINT_MS);

                    var distribution3 = FIRST_CONTENTFUL_PAINT_MS.distributions;
                    console.log(distribution1);

                    var time = FIRST_CONTENTFUL_PAINT_MS.percentile;


                    distribution3.forEach(function(item, index) {
                        item.color = colors[index];
                    });

                    var bar = document.getElementById('bar3');

                    distribution3.forEach(function(item) {
                        var segment = document.createElement('div');
                        segment.className = 'segment';
                        segment.style.width = (item.proportion * 100) + '%';
                        segment.style.backgroundColor = item.color;
                        bar.appendChild(segment);
                    });
                    if (time < 10) {
                        time = 0.01;
                    } else if (time >= 10 && time < 1000) {
                        time = time + 'ms';
                    } else {
                        time = time / 1000 + 's';
                    }

                    var timeDiv = document.createElement('span');
                    timeDiv.textContent = time;
                    timeDiv.style.color = 'green';
                    bar.appendChild(timeDiv);



                    //till here ---------------------------------------------------------------- 





                    /*this section have the code about the First Contentful Paint (FCP)*/
                    var EXPERIMENTAL_TIME_TO_FIRST_BYTE = metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE;
                    console.log(EXPERIMENTAL_TIME_TO_FIRST_BYTE);

                    var distribution2 = EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions;
                    console.log(distribution1);

                    var time = EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile;
                    console.log(time);


                    distribution2.forEach(function(item, index) {
                        item.color = colors[index];
                    });

                    var bar = document.getElementById('bar2');

                    distribution2.forEach(function(item) {
                        var segment = document.createElement('div');
                        segment.className = 'segment';
                        segment.style.width = (item.proportion * 100) + '%';
                        segment.style.backgroundColor = item.color;
                        bar.appendChild(segment);
                    });

                    if (time < 10) {
                        time = 0.01;
                    } else if (time >= 10 && time < 1000) {
                        time = time + 'ms';
                    } else {
                        time = time / 1000 + 's';
                    }

                    //
                    var timeDiv = document.createElement('span');
                    timeDiv.textContent = time;
                    timeDiv.style.color = 'green';
                    bar.appendChild(timeDiv);


                    //till here ---------------------------------------------------------------- 



                    /*this section have the code about the First input delay (FCP)*/
                    var FIRST_INPUT_DELAY_MS = metrics.FIRST_INPUT_DELAY_MS;


                    var distribution4 = FIRST_INPUT_DELAY_MS.distributions;
                    console.log(distribution1);
                    var time = FIRST_INPUT_DELAY_MS.percentile;
                    console.log(time);



                    distribution4.forEach(function(item, index) {
                        item.color = colors[index];
                    });

                    var bar = document.getElementById('bar4');

                    distribution4.forEach(function(item) {
                        var segment = document.createElement('div');
                        segment.className = 'segment';
                        segment.style.width = (item.proportion * 100) + '%';
                        segment.style.backgroundColor = item.color;
                        bar.appendChild(segment);
                    });
                    if (time < 10) {
                        time = 0.01;
                    } else if (time >= 10 && time < 1000) {
                        time = time + 'ms';
                    } else {
                        time = time / 1000 + 's';
                    }

                    //
                    var timeDiv = document.createElement('span');
                    timeDiv.textContent = time;
                    timeDiv.style.color = 'green';
                    bar.appendChild(timeDiv);




                    //till here ---------------------------------------------------------------- 


                    /*this section have the code about the INTERACTION_TO_NEXT_PAINT */
                    var INTERACTION_TO_NEXT_PAINT = metrics.INTERACTION_TO_NEXT_PAINT;


                    var distribution5 = INTERACTION_TO_NEXT_PAINT.distributions;
                    console.log(distribution1);

                    var time = INTERACTION_TO_NEXT_PAINT.percentile;



                    distribution5.forEach(function(item, index) {
                        item.color = colors[index];
                    });

                    var bar = document.getElementById('bar5');

                    distribution5.forEach(function(item) {
                        var segment = document.createElement('div');
                        segment.className = 'segment';
                        segment.style.width = (item.proportion * 100) + '%';
                        segment.style.backgroundColor = item.color;
                        bar.appendChild(segment);
                    });
                    if (time < 10) {
                        time = 0.01;
                    } else if (time >= 10 && time < 1000) {
                        time = time + 'ms';
                    } else {
                        time = time / 1000 + 's';
                    }

                    //
                    var timeDiv = document.createElement('span');
                    timeDiv.textContent = time;
                    timeDiv.style.color = 'green';
                    bar.appendChild(timeDiv);




                    //till here ---------------------------------------------------------------- 


                    /*this section have the code about the LARGEST_CONTENTFUL_PAINT_MS*/
                    var LARGEST_CONTENTFUL_PAINT_MS = metrics.LARGEST_CONTENTFUL_PAINT_MS;


                    var distribution6 = LARGEST_CONTENTFUL_PAINT_MS.distributions;
                    console.log(distribution1);

                    var time = LARGEST_CONTENTFUL_PAINT_MS.percentile;



                    distribution6.forEach(function(item, index) {
                        item.color = colors[index];
                    });

                    var bar = document.getElementById('bar6');

                    distribution6.forEach(function(item) {
                        var segment = document.createElement('div');
                        segment.className = 'segment';
                        segment.style.width = (item.proportion * 100) + '%';
                        segment.style.backgroundColor = item.color;
                        bar.appendChild(segment);
                    });
                    if (time < 10) {
                        time = 0.01;
                    } else if (time >= 10 && time < 1000) {
                        time = time + 'ms';
                    } else {
                        time = time / 1000 + 's';
                    }

                    //
                    var timeDiv = document.createElement('span');
                    timeDiv.textContent = time;
                    timeDiv.style.color = 'green';
                    bar.appendChild(timeDiv);




                    //till here __-________----______-----------------_____---------____---------____--------___------


                    var lighthouseResult = response.lighthouseResult;
                    var categories = lighthouseResult.categories;
                    var abc = categories.performance;
                    console.log(abc);
                    var total_percentage = abc.score * 100; // Convert decimal to percentage
                    console.log(total_percentage);

                    // Get the circle bar
                    var circleBar = document.getElementById('circle-bar');
                    // Calculate the circumference of the circle
                    var radius = 16; // radius of the circle
                    var circumference = 2 * Math.PI * radius;
                    // Calculate the offset
                    var offset = circumference * (1 - total_percentage / 100);
                    // Set the stroke-dashoffset of the circle bar
                    circleBar.style.strokeDashoffset = offset;
                    circleBar.style.strokeDasharray = `${circumference}, ${circumference}`;

                    // Get the percentage text
                    var percentageText = document.getElementById('percentage-text');


                    // Set the text content to the calculated percentage
                    percentageText.textContent = total_percentage.toFixed(0) + '%'; // Round to nearest integer

                    var abc = response.lighthouseResult;
                    console.log(abc);

                    var categories_group = abc.categoryGroups;
                    console.log(categories_group);

                    if (categories_group && 'seo-content' in categories_group) {
                        var seo_content = categories_group['seo-content'];
                        console.log(seo_content);
                    } else {
                        console.log('seo-content does not exist in categories_group');
                    }

                    var seo_crawl = categories_group['seo-crawl'];

                    console.log(seo_crawl);

                    var seo = categories_group['seo-mobile'];

                    console.log(seo);


                    var description = seo_content.description;

                    var description1 = seo_crawl.description;

                    var description2 = seo.description;



                    $("#1st").html(description + "<br>");
                    $("#2nd").html(description1 + "<br>");
                    $("#3rd").html("Make sure your pages are mobile friendly so users don’t have to pinch or zoom in order to read the content pages");


                    // https: //stackoverflow.com/                
                },
                error: function(response) {
                    // Hide loader and overlay
                    $("#loader").hide();
                    $("#overlay").hide();

                    console.log(response);
                    // handle error here
                }
            });
        } else {
            $("#error").html("Please enter a valid URL. ");
        }
    });
});