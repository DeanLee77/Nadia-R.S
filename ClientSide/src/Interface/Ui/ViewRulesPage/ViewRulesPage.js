import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Icon , Button, Segment , Header , Divider} from 'semantic-ui-react';
import Clone from 'clone';

//style
import './ViewRulesPage.scss';

//application
import Nadia from 'src/Application/Nadia';

//component
import RuleComponent from 'src/Interface/Global/Components/RuleComponent'

export default class ViewRulesPage extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
      Nadia.query.getAllRules((res)=>{
        let fields = res.map((item, index)=>{
          return(<div key={index}><RuleComponent key={index} type='view rules' ruleDescription={item} onSelectRule={this._onSelectRule}/> </div>)
          });
        this.setState({fields: fields, rules: res});
      });
    }


    // initialise component state
    state = {
      rules:[],
      itemAdded: false,
      fields:[],

    }

    // prop types and default values
    static propTypes = {

    }
   
    _onSelectRule=(ruleName)=>{
      if(this.props.onSelectRule){
        this.props.onSelectRule(ruleName);
      }
    }

    _onAdd=()=>{
      let tempFields = Clone(this.state.fields);

      tempFields.push(<div key={this.state.fields.length+1}><RuleComponent key={this.state.fields.length+1} type='view rules' onSelectRule={this._onSelectRule}/> </div>);
      this.setState({fields: tempFields, itemAdded: !this.state.itemAdded});
    }

    _onCancel=()=>{
        if(this.state.itemAdded)
        {
          let tempFields = Clone(this.state.fields);
          let temp = tempFields.pop(); // this causes issue with remove the last component form current list even it was saved.
          this.setState({fields: tempFields, editable: !this.state.editable});
        }
    }

    _createButtonGroup=()=>{
      return(
        this.state.process?
          <Form.Group widths='equal' className='buttonField'>
            <Button negative loading floated='right'/>
            <Button positive loading floated='right'/>
            <Button loading floated='right'/>
          </Form.Group>
          :
          <Form.Group widths='equal' className='buttonField'>
            <Button floated='right' onClick={this._onCancel}>
              <Icon name='cancel'/>
              Cancel
            </Button>
            <Button negative floated='right' onClick={this._onAdd}>
                <Icon corner name='add' />
                Add
            </Button>                
          </Form.Group>
      );
    }
    
    // component render method
    render() {
        return (
          <div>
            <Segment basic className='runRuleSegment'>
              <Header as='h3'>
                <Icon circular inverted color='teal' name='database' size='tiny' />
                <Header.Content>
                  View Rule Sets
                </Header.Content>
              </Header>
              <Divider />
              {this.state.fields}
            </Segment>
            <Segment basic className= 'viewRulePageButtonGroup'>
                {this._createButtonGroup()}
            </Segment>
          </div>
        );
    }
}
