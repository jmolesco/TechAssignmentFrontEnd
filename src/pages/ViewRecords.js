import React, { useEffect,useState } from "react";
import { Form, Container, InputGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import { getTransaction } from "../actions/getTransaction";
import { getCurrencyCode } from "../actions/getCurrencyCode";
import { URLpath, URLname, URLcurrencyname } from '../keyword/constant';

const ViewRecords = () => {


    const transaction = useSelector((state) => state);
    const [values, setFilterValue] = useState([]);
    const [isShow, setDisplayValue] = useState(true);
    const [isShowAll, setShowAllValue] = useState(false);
    const [isFilterBy, setFilterBy] = useState();
    const [isFilterByValue, setFilterByValue] = useState();
    const dispatch = useDispatch();
    var config = {
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT",
            "Content-Type": "application/json",
        },
    };
    const fetchTransaction = async (queryString) => {
        var param = "CurrentPage="+queryString.CurrentPage+"&ShowAll="+true+"&Keyword="+queryString.Keyword+"&FilterBy="+queryString.FilterBy+"&FilterByValue="+queryString.FilterByValue;

        const response = await axios
            .get(URLpath + URLname + param, config)
            .catch((err) => {
                console.log("Err", err);
            });
        dispatch(getTransaction(response.data.list));
    }
    const fetchCurrency = async () => {
        const response = await axios
            .get(URLpath + URLcurrencyname, config)
            .catch((err) => {
                console.log("Err", err);
            });
        dispatch(getCurrencyCode(response.data.list));
    }
    useEffect(() => {
        var queryString = {
            CurrentPage:1,
            ShowAll:false,
            Keyword:"",
            FilterBy:"",
            FilterByValue:""
        }
        fetchTransaction(queryString);
        fetchCurrency();
    }, []);

    const onChangeEvent = (e) => {
        e.preventDefault();
        var val = e.target.value;
      
        if(val==="1"){
            var currency =[ { value: '0', label: 'Select' }];
            var items = transaction.currency;
            
            for(var i=0;i<items.length;i++){
                console.log(items[i]);
                currency.push({
                    value:items[i],
                    label:items[i]
                });
            }
           
            setFilterValue(currency);
            setDisplayValue(true);
        }else if(val==="2"){
            setDisplayValue(false);
        }
        else if(val==="3"){
            var status = [
                { value: '0', label: 'Select' },
                { value: '1', label: 'A' },
                { value: '2', label: 'R' },
                { value: '3', label: 'D' },
            ];
            setFilterValue(status);
            setDisplayValue(true);
        }else{
            setDisplayValue(true);
        }
        setFilterBy(val);
    }
    const onChangeEventShowAll = (e) => {
        e.preventDefault();
        var val = e.target.value;
        setShowAllValue((val === 'true'));
    }
    const onChangeEventFilterByValue = (e) => {
        e.preventDefault();
        var val = e.target.value;
        setFilterByValue(val);
    }
    const submitQuery=()=>{
        var queryString = {
            CurrentPage:1,
            ShowAll:isShowAll||0,
            Keyword:"",
            FilterBy:parseInt(isFilterBy)||0,
            FilterByValue:isFilterByValue||0
        }
        console.log(queryString);
        fetchTransaction(queryString);
    }
    const submitClear=()=>{
        setFilterByValue(0);
        setShowAllValue(false);
        setFilterBy(0);
        var queryString = {
            CurrentPage:1,
            ShowAll:false,
            Keyword:"",
            FilterBy:"",
            FilterByValue:""
        }
        fetchTransaction(queryString);
        setDisplayValue(true);
    }
    const handleChange=(e)=>{
        e.preventDefault();
        console.log(e.target.value);
        setFilterByValue(e.target.value);
    }
    console.log(transaction);
    return (
        <Container>
            <br></br>
            <h3>
                List of Records
            </h3>
            {/* <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">ShowAll</InputGroup.Text>
                <Form.Select onChange={onChangeEventShowAll} value={isShowAll}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </Form.Select>
            </InputGroup> */}
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Filter By</InputGroup.Text>
                <Form.Select onChange={onChangeEvent} value={isFilterBy}>
                    <option value="0">Select</option>
                    <option value="1">Currency</option>
                    <option value="2">Date Range</option>
                    <option value="3">Status</option>
                </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3" hidden={!isShow}>
                <InputGroup.Text id="basic-addon1">Select Value</InputGroup.Text>
                <Form.Select onChange={onChangeEventFilterByValue} value={isFilterByValue}>
                      {values.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3" hidden={isShow} value={isFilterByValue}>
                <InputGroup.Text id="basic-addon1">Select Date</InputGroup.Text>
                <Form.Control type="date" name="daterange" onChange={handleChange}/>
            </InputGroup>
            <Button onClick={submitQuery}>Submit Query</Button> &nbsp;&nbsp;&nbsp;
            <Button onClick={submitClear}>Clear</Button>
            <br></br>
            <br></br>
            
            <BootstrapTable data={transaction.trangetAll} striped hover>
                <TableHeaderColumn isKey dataField='transactionId'>Invoice ID</TableHeaderColumn>
                <TableHeaderColumn dataField='payment'>Payment</TableHeaderColumn>
                <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
            </BootstrapTable>,
        </Container>
    );
}
export default ViewRecords;