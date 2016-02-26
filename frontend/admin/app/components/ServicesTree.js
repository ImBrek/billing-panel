import React, { Component, PropTypes } from 'react'

class ServicesTree extends Component {
    constructor(props) {
        super(props)
    }

    renderCategory(category) {
        return <tr className="level-0" key={'c'+category.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {category.title}</span>
            </td>
            <td>{category.cost}</td>
            <td>{category.description}</td>
        </tr>
    }
    renderService(service) {
        return <tr className="level-1" key={'s'+service.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {service.title}</span>
            </td>
            <td>{service.cost}</td>
            <td>{service.description}</td>
        </tr>
    }
    renderOption(option) {
        return <tr className="level-2" key={'o'+option.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {option.title}</span>
            </td>
            <td>{option.cost}</td>
            <td>{option.description}</td>
        </tr>
    }
    renderValue(value) {
        return <tr className="level-3" key={'v'+value.id}>
            <td>
                <i className="fa fa-minus expand-control"></i>
                <span className="intend"> {value.title}</span>
            </td>
            <td>{value.cost}</td>
            <td>{value.description}</td>
        </tr>
    }

    render() {
        let table = [];
        this.props.tree.forEach((category)=> {
            table.push(this.renderCategory(category))
            category.services.forEach((service)=>{
                table.push(this.renderService(service))
                service.options.forEach((option)=>{
                    table.push(this.renderOption(option))
                    option.values.forEach((value)=>{
                        if (option.type === 0){
                            table.push(this.renderValue(value))
                        }
                    })
                })
            })
        })
        return (
            <table className="table table-striped table-tree table-bordered">
                <thead>
                <tr>
                    <th><i className="fa fa-minus-square expand-control"></i> Name</th>
                    <th>Cost</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
        )
    }
}

export default ServicesTree