import React, { Component } from "react"
import axios from "axios"

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'

import IconButton from 'material-ui/IconButton'
import { Send } from '@material-ui/icons'

import { withStyles } from 'material-ui/styles';
import { Grid, Row } from 'react-flexbox-grid'

const STELLAR_HORIZON_BALANCE = " https://horizon-testnet.stellar.org/accounts/"

class StellarForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: "",
            balances: [],
            notification: 0
        }

        this.queryBalance = this.queryBalance.bind(this)
        this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this)
    }

    handleOnChangeAddress(value) {
        this.setState({ address: value })
    }

    queryBalance(address) {
        // TODO: Preprocess address
        // TODO: Validate
        let url = STELLAR_HORIZON_BALANCE + this.state.address
        axios.get(url)
            .then((res) => {
                let balances = res.data.balances
                // console.log(balances)
                this.setState({ balances: balances })
                this.setState({ notification: 1 }) // TODO:  group
            })
            .catch(res => {
                // console.log(res)
                this.setState({ notification: 2 })
            })
    }

    render() {
        return (
            <Grid fluid>
                <Row center="xs">
                    <StellarSubmitStyle handleQueryBalance={this.queryBalance} handleOnChangeAddress={this.handleOnChangeAddress} />
                </Row>
                <Row center="xs">
                    <StellarNotificationStyle dataNotification={this.state.notification} />
                </Row>
                <Row>
                    <StellarBalanceList handleUpdateList={this.handleUpdateList} dataBalanceList={this.state.balances} />
                </Row>
            </Grid>
        )
    }
}

class StellarSubmit extends Component {
    constructor(props) {
        super(props)

        this.handleQueryBalance = this.handleQueryBalance.bind(this)
        this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this)
    }

    handleOnChangeAddress(event) {
        this.props.handleOnChangeAddress(event.target.value)
    }

    handleQueryBalance(event) {
        event.preventDefault()
        this.props.handleQueryBalance()
    }

    render() {
        return (
            <form action="" onSubmit={this.handleQueryBalance} className={this.props.classes.stellarForm}>
                <TextField
                    type="text"
                    onChange={this.handleOnChangeAddress}
                    name=""
                    id=""
                    label="Your Stellar Public Address"
                    placeholder="GXXX..."
                />
                <Button
                    type="button"
                    value="Check"
                    onClick={this.handleQueryBalance}
                    variant="raised"
                    color="primary">
                    Check
                </Button>
            </form>
        )
    }
}

const styleStellarSubmit = {
    stellarForm: {
        backgroundColor: "",
    },
}

let StellarSubmitStyle = withStyles(styleStellarSubmit)(StellarSubmit)


class StellarBalanceList extends Component {
    render() {
        let balances = this.props.dataBalanceList
        console.log(balances) // TODO: why x2?
        balances = balances.map(node => <ListItem>
            <ListItemText>
                {node.asset_code} - {node.asset_issuer}
                {/* Asset Type: {node.asset_type}  */}
                Balace: {node.balance}
                Trust Limit: {node.balance}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton><Send /></IconButton>
            </ListItemSecondaryAction>
        </ListItem>)

        return <List>
            {balances}
        </List>
    }
}

class StellarNotification extends Component {
    render() {
        let msg
        switch (this.props.dataNotification) {
            case 0:
                msg = "Ready"
                break
            case 1:
                msg = "Done"
                break
            case 2:
                msg = "Failed"
                break
            default:
                msg = ""
        }
        return <Paper zDepth={5} className={this.props.classes.stellarNotification}>
            {msg}
        </Paper>
    }
}

const styleStellarNotification = {
    stellarNotification: {
        backgroundColor: "",
    },
}

let StellarNotificationStyle = withStyles(styleStellarNotification)(StellarNotification)


export default StellarForm