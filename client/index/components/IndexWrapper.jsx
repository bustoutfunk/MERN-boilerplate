var React = require('react');

var IndexWrapper = React.createClass({
  render: function(){
    return (
      <div>
        <h1> WellSense </h1>
        {this.props.children}
      </div>
    );
  }
});

module.exports = IndexWrapper;
