var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var connect = require('react-redux').connect;
var LineChart = require("react-chartjs").Line;

var RedirectHelper = require('../../shared/utils/RedirectHelper');

var WellData = React.createClass({
  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      type: 'battery'
    }
  },

  getInitialState: function(){
    return {
      wellData: this.props.wellData || [],
      chartData: [], // Filters wellData
      chartLabels: [],
      dateRangeLabels: ['Month', 'Week', 'Day', 'Hour'],
      dateRange: 'Month'
    }
  },

  componentDidMount: function(){
    //Check Params
    if(!['battery', 'temperature', 'water'].includes(this.props.params.type)){
      RedirectHelper(this.props.dispatch, '/');
    }

    //Verify Well ID

    this._updateChartData(this.state.dateRange);
  },

  render: function(){
    var chartData = {
      labels: this.state.chartLabels,
      datasets: [
        {
          data: this.state.chartData
        }
      ]
    };
    var chartOptions = {
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0,

      responsive: true,
      bezierCurve : false,
      pointDotRadius: 1,
      pointHitDetectionRadius: 1,
      scaleShowVerticalLines: false,
    }

    var buttons = this.state.dateRangeLabels.map((label)=>{
      return <button key={label} onClick={ ()=>{this._updateChartRange(label)} }>{label}</button>
    });

    return (
      <div>
        {buttons}
        <LineChart data={chartData} options={chartOptions} height={400}/>
      </div>
    )
  },

  _updateChartRange: function(rangeValue) {
    this._updateChartData(rangeValue);
  },

  _updateChartData: function(rangeValue) {
    var chartData = [];
    var chartLabels = [];

    var viewToData = {'battery': 'battery', 'temperature': 'temp', 'water': 'level'};
    var rangeToFormat = {'Month': 'M/D/YY', 'Week': 'M/D/YY', 'Day': 'HH:mm', 'Hour': 'mm:ss'}

    _.each(this.state.wellData, function(dataPoint){
      if(dataPoint.well_id === this.props.params.wellId){
        // Get X-Value Label
        var label = moment(dataPoint.record_date, "YYYY-MM-DD HH:mm:ss Z");

        // If Date is not in range, skip to the next point
        if(!this._dateWithinRange(rangeValue, label))
          return;

        chartLabels.push(label.format(rangeToFormat[rangeValue]));

        // Get Y-Value
        var value = dataPoint[viewToData[this.props.params.type]];
        if(!isNaN(value)) {
          value = parseFloat(value); 
          chartData.push(value);
        }
        else throw new Error('Invalid Well Value');
      }
    }, this);

    // Edit Chart Labels Array so that only n number of labels are shown
    var interval = Math.floor(chartLabels.length / 7);
    chartLabels = chartLabels.map(function(label, index){
      return (interval <= 0 || index % interval === 0) ? label : "";
    });

    this.setState({
      dateRange: rangeValue,
      chartData: chartData,
      chartLabels: chartLabels
    });
  },

  _dateWithinRange: function(range, date) {
    var currentDate = moment()
    var priorDate = moment()

    //Set Prior Date
    switch(range){
      case 'Month':
        priorDate.subtract(1, 'months');
        break;
      case 'Week':
        priorDate.subtract(7, 'days');
        break;
      case 'Day':
        priorDate.subtract(1, 'days');
        break;
      case 'Hour':
        priorDate.subtract(1, 'hours');
        break;
    }

    //Parse Date and see if it's within the range
    date = moment(date);
    return (date.unix() >= priorDate.unix() && date.unix() <= currentDate.unix())
  }

});

var mapStateToProps = function(state){
  return {
    wellData: [
    {
    "id": "37",
    "level": "H",
    "battery": "71.1",
    "temp": "82.4",
    "well_id": "100",
    "record_date": "2016-7-20 11:10:48",
    "record_by": "3",
    "mac_address": "0013A20040C42A47",
    "stat1": "1",
    "stat2": "1",
    "pg": "1",
    "created": "2015-12-06 14:10:49",
    "modified": "2015-12-06 14:10:49",
    "is_send_push": "0"
  },
  {
    "id": "38",
    "level": "H",
    "battery": "70.1",
    "temp": "82.4",
    "well_id": "100",
    "record_date": "2016-8-11 11:24:52",
    "record_by": "3",
    "mac_address": "0013A20040C42A47",
    "stat1": "1",
    "stat2": "1",
    "pg": "1",
    "created": "2015-12-06 14:24:53",
    "modified": "2015-12-06 14:24:53",
    "is_send_push": "0"
  },
  {
    "id": "39",
    "level": "H",
    "battery": "75.1",
    "temp": "82.4",
    "well_id": "100",
    "record_date": "2016-8-19 9:25:06",
    "record_by": "3",
    "mac_address": "0013A20040C42A47",
    "stat1": "1",
    "stat2": "1",
    "pg": "1",
    "created": "2015-12-06 14:25:07",
    "modified": "2015-12-06 14:25:07",
    "is_send_push": "0"
  },
  {
    "id": "39",
    "level": "H",
    "battery": "73.1",
    "temp": "82.4",
    "well_id": "100",
    "record_date": "2016-8-19 10:25:06",
    "record_by": "3",
    "mac_address": "0013A20040C42A47",
    "stat1": "1",
    "stat2": "1",
    "pg": "1",
    "created": "2015-12-06 14:25:07",
    "modified": "2015-12-06 14:25:07",
    "is_send_push": "0"
  },
  {
    "id": "39",
    "level": "H",
    "battery": "74.1",
    "temp": "82.4",
    "well_id": "100",
    "record_date": "2016-8-19 10:25:06",
    "record_by": "3",
    "mac_address": "0013A20040C42A47",
    "stat1": "1",
    "stat2": "1",
    "pg": "1",
    "created": "2015-12-06 14:25:07",
    "modified": "2015-12-06 14:25:07",
    "is_send_push": "0"
  }
    ]
  }
}

module.exports = connect(mapStateToProps)(WellData);

