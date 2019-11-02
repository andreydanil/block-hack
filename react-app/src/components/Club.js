import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withRouter} from 'react-router-dom';
import QRCode from 'qrcode.react';

class Club extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aspirationsList: this.aspirations,
            newAsp: "",
            data:{
                blockName: "",
                streetName: "",
                streetNumber: "",
                missionStatement: "",
                fbGroup: "",
                aspirations: [],
                orgName: "",
                orgPhone: "",
                orgEmail: ""
            }
        }
    }
    componentDidMount(){
        let oldDetails = JSON.parse(localStorage.getItem("flyerDetails"));
        if(!oldDetails){
            return;
        }
        console.log(oldDetails)
        this.setState({data:oldDetails});
    }
    addAspiration = () =>{
        if(this.state.newAsp === ""){
            return;
        }
        let aspList = [...this.state.aspirationsList];
        aspList.push(this.state.newAsp);
        this.setState({aspirationsList:aspList,newAsp:""});
    }
    toFlyer = async () =>{
        if(this.state.data.fbGroup !== ""){
            let canvas = document.querySelector("canvas");
            let qrImage = await canvas.toDataURL('image/jpeg', 1.0);
            await localStorage.setItem('qrImage',qrImage);
        }
        else{
            localStorage.setItem('qrImage',null);
        }
        let stringifiedDetails = JSON.stringify(this.state.data);
        await localStorage.setItem('flyerDetails', stringifiedDetails);
        this.props.history.push("/flyer");
    }
    aspirations = [
        "Youth Oriented",
        "Community Service Centered",
        "Safety Focused",
        "Education Focused",
        "Promoting Mental Health",
        "Fun!",
        "Friendliness",
        "Faith Based",
        "Action Over Words",
        "Engage Local Politicians"
    ]
    handleAspiration = (asp) =>{
        let currAsp = [...this.state.data.aspirations];
        if(currAsp.includes(asp)){
            currAsp.splice(currAsp.indexOf(asp),1);
        }else{
            currAsp.push(asp);
        }
        this.handleChange(currAsp,"aspirations");
    }
    generateAspirations = () =>{
        let dataAspirations = this.state.data.aspirations;
        return this.state.aspirationsList.map((a,i)=>{
            return(
                <FormControlLabel
                    key={i}
                    control={
                    <Checkbox
                        onChange={()=>this.handleAspiration(a)}
                        checked={dataAspirations.includes(a)}
                        color="primary"
                    />
                    }
                    label={a}
                />
            )
        })
    }
    handleChange = (value,key) =>{
        let data = {...this.state.data};
        data[key] = value;
        this.setState({data});
    }
    render(){
        let {blockName,streetName,streetNumber,missionStatement,fbGroup,orgName,orgPhone,orgEmail} = this.state.data;
        return(
            <div className="center">
                <h2>
                    Make A New Block Club
                </h2>
                <h3>Block Details</h3>
                <TextField
                    value={blockName}
                    onChange={(e)=>this.handleChange(e.target.value,"blockName")}
                    id="outlined-basic"
                    label="Block Name"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <TextField
                    value={streetName}
                    onChange={(e)=>this.handleChange(e.target.value,"streetName")}
                    id="outlined-basic"
                    label="Street Name"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <TextField
                    value={streetNumber}
                    onChange={(e)=>this.handleChange(e.target.value,"streetNumber")}
                    id="outlined-basic"
                    label="Street Number"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <TextField
                    value={missionStatement}
                    onChange={(e)=>this.handleChange(e.target.value,"missionStatement")}
                    id="outlined-multiline-static"
                    label="Block Mission Statement"
                    multiline
                    rows="4"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <TextField
                    value={fbGroup}
                    onChange={(e)=>this.handleChange(e.target.value,"fbGroup")}
                    id="outlined-basic"
                    label="Link to Facebook Group"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <QRCode value={fbGroup} />
                <h2>Block Aspirations</h2>
                {this.generateAspirations()}
                <TextField
                    value={this.state.newAsp}
                    onChange={(e)=>this.setState({newAsp:e.target.value})}
                    id="outlined-basic"
                    label="Add Additional Aspirations"
                    margin="normal"
                    variant="outlined"
                    style={{width:'70%'}}
                />
                <Button variant="contained" color="primary" onClick={this.addAspiration} style={{marginTop:25,marginLeft:10}}>
                    Add
                </Button>
                <h3>Organizer Details</h3>
                <TextField
                    value={orgName}
                    onChange={(e)=>this.handleChange(e.target.value,"orgName")}
                    id="outlined-basic"
                    label="Organizer Name"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <TextField
                    value={orgPhone}
                    onChange={(e)=>this.handleChange(e.target.value,"orgPhone")}
                    id="outlined-basic"
                    label="Organizer Phone Number"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <TextField
                    value={orgEmail}
                    onChange={(e)=>this.handleChange(e.target.value,"orgEmail")}
                    id="outlined-basic"
                    label="Organizer Email"
                    margin="normal"
                    variant="outlined"
                    style={{width:'100%'}}
                />
                <div style={{height:20}}/>
                <Button variant="contained" color="primary" onClick={this.toFlyer}>
                    Generate Flyer
                </Button>
                <div style={{height:50}}/>
            </div>
        )
    }
}

export default withRouter(Club);