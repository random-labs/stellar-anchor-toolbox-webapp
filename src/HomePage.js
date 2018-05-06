import React, { Component } from "react"

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles'

import { Delete } from '@material-ui/icons'

const styles = {
    root: {
        margin: 20,
        padding: 20,
        maxWidth: 400
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputForm: "",
            todo: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    handleTextChange(event) {
        let value = event.target.value
        this.setState({ inputForm: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ todo: this.state.todo.concat(this.state.inputForm), inputForm: "" }, () => console.log(this.state.todo))
    }

    handleDelete(event) {

    }

    render() {
        let nodes = this.state.todo.map((data, id) => {
            return <ListItem key={id}>
                <ListItemText primary={data}></ListItemText>
                <ListItemSecondaryAction>
                    <IconButton color='primary' onClick={() => this.handleDelete(id)}>
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        })
        return <div>
            <Typography variant='display1' align='center' gutterBottom>
                Hello world
            </Typography>
            <form action="" onSubmit={this.handleSubmit}>
                <TextField
                    name="title"
                    label="Exercise"
                    value={this.state.inputForm}
                    onChange={this.handleTextChange}
                    margin="normal" />
                <Button type='submit' color='primary' variant='raised' onClick={this.handleSubmit}> Create </Button>
            </form>

            <List>
                {nodes}
            </List>
        </div>
    }
}

export default withStyles(styles)(HomePage)