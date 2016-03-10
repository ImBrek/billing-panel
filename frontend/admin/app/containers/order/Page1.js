import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import  classnames  from 'classnames'
import _ from 'lodash';

export const fields = [
    'firstName',
    'lastName',
    'categoryId',
    'serviceId',
    'descendants[].id',
    'descendants[].cost',
    'descendants[].optionId',
    'descendants[].value',

];

const validate = values => {
    const errors = {};
    if (!values.categoryId) {
        errors.categoryId = 'Required';
    }
    if (!values.serviceId) {
        errors.serviceId = 'Required';

    }
    if (values.descendants.length) {
        errors.descendants = [];
        values.descendants.forEach((service)=>{
            // const error = {};
            // if (!(service.optionId || service.value.value)){
            //     error.optionId = 'Required';
            // }
            // errors.descendants.push(error);
        })
    }

    return errors;
};

class Page1 extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props)
        this.loadAddtFields = this.loadAddtFields.bind(this);
    }

    loadAddtFields (e) {
        const {
            fields: {serviceId, categoryId, descendants},
            servicesTree
        } = this.props;
        const selectedCategory = _.find(servicesTree, {id: +categoryId.value});
        const selectedService = _.find(selectedCategory.services, {id: +e.target.value});

        _.each(descendants, ()=> {
            descendants.removeField();
        });

        if (selectedService) {
            selectedService.descendants.map((addt)=> {
                descendants.addField({
                    id: addt.id
                });
            })
        }
    }

    renderCategories () {
        const {
            fields: {categoryId},
            servicesTree
        } = this.props;

        const selectedCategory = _.find(servicesTree, {id: +categoryId.value});

        const categoriesList = servicesTree.map((category, index)=> {
            return <option value={category.id}>{category.title}</option>
        });
        categoriesList.unshift(<option></option>)

        return [selectedCategory, categoriesList];
    }

    renderServices (selectedCategory) {
        const {
            fields: {serviceId},
            servicesTree
        } = this.props;

        if (selectedCategory) {
            const servicesList = selectedCategory.services.map((service)=> {
                return <option value={service.id}>{service.title} - {service.cost}</option>
            });
            servicesList.unshift(<option></option>)
            const selectedService = _.find(selectedCategory.services, {id: +serviceId.value});
            return [selectedService, servicesList];
        } else {
            return [null, null];
        }
    }

    renderAddtServices (selectedService) {
        const {
            fields: {descendants},
            servicesTree
        } = this.props;

        if (selectedService) {
            const list = selectedService.descendants.map((addt, index)=> {
                return (<div className={classnames("form-group",{"has-error":false})}>
                    <label className="col-sm-2 control-label">{addt.title}</label>
                    <div className="col-sm-9">
                        {this.renderAddtServiceInput(addt, descendants[index])}
                    </div>
                </div>)
            })
            return [list]
        } else {
            return [null, null];
        }
    }

    renderAddtServiceInput (addt, control) {
        if (addt.type == 0) {
            return (<input {...control.value} type="text" className="form-control"/>)
        } else {
            const list = addt.options.map((opt, index)=> {
                return <option value={opt.id}>{opt.title} - {opt.cost}</option>
            });
            list.unshift(<option></option>)

            return (<select {...control.optionId} className="form-control">
                {list}
            </select>)
        }
    }

    calcTotalCost () {
        let result = 0;
        const {
            entities,
            fields: {serviceId, descendants, categoryId},
        } = this.props;
        if (!serviceId.value || !categoryId.value) return 0;
        result += entities.services[serviceId.value].cost;
        result = descendants.reduce((acc, service)=> {
            const entity = entities.services[service.id.value];
            if (entity.type == 0) {
                if (service.value.value) {
                    return acc + entity.cost;
                }
            } else {
                if (service.optionId.value) {
                    const option = entities.options[service.optionId.value];
                    return acc + option.cost;
                }
            }
            return acc;
        }, result);
        return result;
    }

    render () {
        const {
            fields: {firstName, lastName, categoryId, serviceId, test},
            handleSubmit,
            servicesTree
        } = this.props;

        const [selectedCategory,categoriesList] = this.renderCategories();
        const [selectedService,servicesList] = this.renderServices(selectedCategory);
        const [addtServicesList] = this.renderAddtServices(selectedService);

        return (<form onSubmit={handleSubmit} className="form-horizontal">
                <div className={classnames("form-group",{"has-error":categoryId.error})}>
                    <label className="col-sm-2 control-label">Category</label>
                    <div className="col-sm-9">
                        <select {...categoryId} value={categoryId.value || ''} className="form-control">
                            {categoriesList}
                        </select>
                    </div>
                </div>
                <div className={classnames("form-group",{"has-error":serviceId.error})}>
                    <label className="col-sm-2 control-label">Service</label>
                    <div className="col-sm-9">
                        <select {...serviceId} value={serviceId.value || ''} className="form-control"
                                               onChange={(e)=>{serviceId.onChange(e);this.loadAddtFields(e)}}>
                            {servicesList}
                        </select>
                    </div>
                </div>
                {addtServicesList}
                <div className="form-group">
                    <label className="col-sm-2 control-label"><h3>Total cost</h3></label>
                    <div className="col-sm-9">
                        <h3 className="form-control-static">{this.calcTotalCost()}</h3>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-9">
                        <button type="submit" className="btn btn-primary">
                            Next <i/>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'wizard',              // <------ same form name
    fields,                      // <------ only fields on this page
    destroyOnUnmount: false,     // <------ preserve form data
    validate                     // <------ only validates the fields on this page
}, null, {})(Page1);