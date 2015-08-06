function otherScripts(){
  
    $(function() {
        /*
         * DONUT CHART -- 1
         * -----------
         */

        var donutData = [
            {label: "Series2", data: 30, color: "#42c4c6"},
            {label: "Series3", data: 20, color: "#22a9ab"},
            {label: "Series4", data: 50, color: "#51c7c9"}
        ];
        $.plot("#donut-chart", donutData, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    innerRadius: 0.5,
                    label: {
                        show: true,
                        radius: 2 / 3,
                        formatter: labelFormatter,
                        threshold: 0.1
                    }

                }
            },
            legend: {
                show: false
            }
        });
        /*
         * END DONUT CHART
         */
        
         /*
         * DONUT CHART -- 2
         * -----------
         */

        var donutData = [
            {label: "Series2", data: 30, color: "#3c8dbc"},
            {label: "Series3", data: 20, color: "#0073b7"},
            {label: "Series4", data: 50, color: "#00c0ef"}
        ];
        $.plot("#donut-chart2", donutData, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    innerRadius: 0.5,
                    label: {
                        show: true,
                        radius: 2 / 3,
                        formatter: labelFormatter,
                        threshold: 0.1
                    }

                }
            },
            legend: {
                show: false
            }
        });
        /*
         * END DONUT CHART
         */
        
         /*
         * DONUT CHART -- 3
         * -----------
         */

        var donutData = [
            {label: "Series2", data: 30, color: "#3c8dbc"},
            {label: "Series3", data: 20, color: "#0073b7"},
            {label: "Series4", data: 50, color: "#00c0ef"}
        ];
        $.plot("#donut-chart3", donutData, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    innerRadius: 0.5,
                    label: {
                        show: true,
                        radius: 2 / 3,
                        formatter: labelFormatter,
                        threshold: 0.1
                    }

                }
            },
            legend: {
                show: false
            }
        });
        /*
         * END DONUT CHART
         */

    });

    /*
     * Custom Label formatter
     * ----------------------
     */
    function labelFormatter(label, series) {
        return "<div style='font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;'>"
                + label
                + "<br/>"
                + Math.round(series.percent) + "%</div>";
    }
}
function clickHandlers(){
    
}
function formHandlers(){
      
}


