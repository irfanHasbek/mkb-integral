function otherScripts(){
  
    $(function() {
        /*
         * DONUT CHART -- 1
         * -----------
         */

        var donutData = [
            {label: "Series2", data: 30, color: "#a85802"},
            {label: "Series3", data: 20, color: "#cb6d0a"},
            {label: "Series4", data: 50, color: "#f38e22"}
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
            {label: "Series2", data: 30, color: "#c13a0b"},
            {label: "Series3", data: 20, color: "#cf5226"},
            {label: "Series4", data: 50, color: "#e46b40"}
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


