/** In this file, we create a React component which incorporates components provided by material-ui */
var $ = require('jQuery');
var React = require('react'),
    _ = require('underscore'),
    mui = require('material-ui'),
    TextField = mui.TextField;
var Snackbar = mui.Snackbar;
var Navbar = require('react-bootstrap').Navbar;
var Alert = require('react-bootstrap').Alert;

var Block = require('./Block.jsx');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Main = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    DismissSnack: function () {
        this.refs.mySnack.dismiss();
    },
    loadCardFromServer: function () {
        $.ajax({
            type: "GET",
            url: "https://api.trello.com/1/members/samyg1988@gmail.com/cards?key=1533317dcd0ad93044ecc88badae23d7",
            success: function (cards) {
                var nestedCards = _.groupBy(cards, function (card) {
                    return card.idList;
                });
                this.refs.mySnack.show();
                setTimeout(this.DismissSnack, 3000);
                this.setState({data: nestedCards});
                window.localStorage.setItem('cards', JSON.stringify(cards));
            }.bind(this),
            error: alert
        });
    },
    componentDidMount: function () {
        var $this = this;
        this.setState({data: []});
        if (window.localStorage.getItem('cards') === null)
            loadCardFromServer();
        else {
            var cards = JSON.parse(window.localStorage.getItem('cards'));
            var nestedCards = _.groupBy(cards, function (card) {
                return card.idList;

            });
            $this.setState({data: nestedCards});
        }
    },
    _handleSearchInputChange: function (event) {
        var cards = JSON.parse(window.localStorage.getItem('cards'));
        var nestedCards = _.groupBy(_.filter(cards, function (card) {
            return card.name.indexOf(event.target.value) > -1
        }), function (card) {
            return card.idList;
        });
        this.setState({data: nestedCards});
    },
    render: function () {

        var BlockNodes = _.map(this.state.data, function (prop) {
            return (<Block data={prop}></Block>);
        });
        if (BlockNodes.length == 0) {
            BlockNodes = <Alert bsStyle='warning'>
                <strong>No item found</strong>
            </Alert>
        }

        return (
            <div>

                <div className="example-page">

                    <Navbar>
                        <TextField hintText="Filter the Cards' text" floatingLabelText="Search"
                                   className="long-mail-search" onChange={this._handleSearchInputChange}/>
                        <span className="glyphicon glyphicon-search"></span>
                        <a href="#" className="btn btn-sm btn-success pull-right" onClick={this.loadCardFromServer}>Reload
                            Cards</a>
                    </Navbar>

                    <Snackbar
                        message="cards loaded from server"
                        action="dismiss"
                        ref="mySnack"
                        onActionTouchTap={this.DismissSnack}
                        />

                    <div className="container">
                        <div className="row">
                            <div className="error-notice">
                                {BlockNodes}
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        );
    }

});

module.exports = Main;