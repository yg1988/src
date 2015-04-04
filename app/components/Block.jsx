/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react'),
 mui = require('material-ui');
var Paper = mui.Paper;
var Well = require('react-bootstrap').Well;
var Card = require('./Card.jsx');


var Block = React.createClass({
	propTypes: {
		children: React.PropTypes.array
	},

  render: function() {
	var CardPerList = this.props.data.map(function(card,index){
		return (
			<Card card={card} index={index}></Card>
		);
	}); 
    return ( 
		<Well bsSize='small' className='wellSpecial'>
				{CardPerList}
		</Well>
    );
  }
});

module.exports = Block; 