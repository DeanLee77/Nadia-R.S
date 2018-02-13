import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'
import {Segment, Form , Label , Input , Icon , Button } from 'semantic-ui-react';

//application
import Nadia from 'src/Application/Nadia';

//style
import './RuleComponent.scss';

export default class RuleComponent extends React.Component {
    constructor(props) {
      super(props);
    }


    // initialise component state
    state = {
        editable: false,
        process: false,
        category:'',
        name:'',
        type:'',
    }

    // prop types and default values
    static propTypes = {
        // ruleDescription: PropTypes.object,
    }

    componentDidMount=()=>{
        this.setState({ruleDescription: this.props.ruleDescription , 
                        category:  this.props.ruleDescription?this.props.ruleDescription.category:'', 
                        name:  this.props.ruleDescription?this.props.ruleDescription.name:'',
                        type: this.props.type,});
    }
    componentWillReceiveProps=(nextProps)=>{
       this.setState({type: nextProps.type, 
                      ruleDescription: nextProps.ruleDescription, 
                      category: nextProps.ruleDescription?nextProps.ruleDescription.category:'', 
                      name: nextProps.ruleDescription?nextProps.ruleDescription.name:'', 
                      });
   }
    _onCategoryChange=(e)=>{
        this.setState({category: e.target.value, edited: true});
    }
    _onNameChange=(e)=>{
        this.setState({name: e.target.value, edited: true});
    }

    _onEdit=()=>{
        this.setState({editable: !this.state.editable});
    }
    _onCancel=()=>{
        if(!this.state.category || !this.state.name){
            this.setState({editable: !this.state.editable});
        }
        else{
            this.setState({editable: !this.state.editable, category: this.state.category, name: this.state.name});
        }
        
    }
    _onSave=()=>{
        this.setState({process: !this.state.process});
        Nadia.command.ruleDescriptionChange(this.state.name, this.state.category, (res) =>{
            if(res.category == this.state.category && res.ruleName == this.state.name)
            {
                this.setState({process: !this.state.process});
                //we need toast message for this.
            }
            else{
                //we need error screen for this.
            }
        });  
      }
  
    _onView=()=>{

    }
    _createFields=()=>{
        let fields;
        let buttonGroup;
        if(this.state.type == 'run rules'){
            buttonGroup = <Form.Group widths='equal' className='buttonField'>
                                <Button floated='right' color='twitter' onClick= {this._onRun}>
                                    <Icon name='comments outline'/>
                                    Run 
                                </Button>
                            </Form.Group>;
        }
        else if(this.state.type = 'view rules'){
            buttonGroup = <Form.Group widths='equal' className='buttonField'>
                                <Button floated='right' color='twitter' as={Link} to='/RuleEditorPage'>
                                    <Icon name='comments outline'/>
                                    View 
                                </Button>
                                
                                {this.state.editable?
                                    <div>
                                        <Button floated='right' onClick= {this._onCancel}>
                                            <Icon name='cancel'/>
                                            Cancel 
                                        </Button>
                                        <Button floated='right' color='teal' onClick= {this._onSave}>
                                            <Icon name='save'/>
                                            Save 
                                        </Button>
                                    </div>
                                    :
                                    <Button positive floated='right' onClick= {this._onEdit}>
                                        <Icon name='edit'/>
                                        Edit 
                                    </Button>}
                            </Form.Group>;
            
        }                         
        if(this.state.editable){
            fields = <Segment className='ruleComponentSegment'>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Label size='small'>Category</Label>
                                    <Form.Input size='large' onChange={this._onCategoryChange} value={this.state.category}  placeholder='Category'/>
                                </Form.Field>
                                <Form.Field>
                                    <Label size='small'>Name</Label>
                                    <Form.Input size='large' onChange={this._onNameChange} value={this.state.name} placeholder='Name'/>
                                </Form.Field>
                            </Form.Group>
                            {buttonGroup}
                        </Form>
                    </Segment> ;
        }
        else{
            fields = <Segment className='ruleComponentSegment'>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Label size='small'>Category</Label>
                                    <Form.Input readOnly size='large' value={this.state.category} placeholder='Category'/>
                                </Form.Field>
                                <Form.Field>
                                    <Label size='small'>Name</Label>
                                    <Form.Input readOnly size='large' value={this.state.name} placeholder='Name'/>
                                </Form.Field>
                            </Form.Group>
                            {buttonGroup}
                        </Form>
                    </Segment> ;
        }           
        
        return fields;
    }
    // component render method
    render() {
      let component = this;
        return (
          <div>
            {this._createFields()}
          </div>
        );
    }
}
