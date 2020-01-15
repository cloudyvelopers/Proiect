//Editor pentru lista de proiecte adaugate de catre studenti

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'
import {Dialog} from 'primereact/dialog'

import {projectActions} from '../actions'

const mapStateToProps = function(state) {
    return {
        projectList : state.project.projectList,
        loading : state.project.fetching
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
      actions: bindActionCreators({
          getProjects : projectActions.getProjects,
          addProject : projectActions.addProject,
          updateProject : projectActions.updateProject,
          deleteProject : projectActions.deleteProject
      }, dispatch)
    }
}


class ProjectEditor extends Component{
    constructor(props){
        super(props)

        this.state = {
            isAddDialogShown : false,
            isNewProject : true,
            project : {
                title : '',
                file : ''
            }
        }

        this.deleteProject = (rowData) => {
            this.props.actions.deleteProject(rowData.id)
        }

        this.addNew = () => {
            let emptyProject = {
                title : '',
                file : ''
            }
            this.setState({
                isAddDialogShown : true,
                isNewProject : true,
                project : emptyProject
            })
        }

        this.hideAddDialog = () => {
            this.setState({
                isAddDialogShown : false
            })
        }

        this.editProject = (rowData) => {
            let projectCopy = Object.assign({}, rowData)
            this.setState({
                project: projectCopy,
                isNewProject : false,
                isAddDialogShown : true
            })
        }

        this.updateProperty = (property, value) => {
            let project = this.state.project
            project[property] = value
            this.setState({
                project : project
            })
        }

        this.opsTemplate = (rowData) => {
            return <div>
                <Button icon="pi pi-times" className="p-button-danger" onClick={() => this.deleteProject(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => this.editProject(rowData)} />
            </div>
        }

        this.saveProject = () => {
            if (this.state.isNewProject){
                this.props.actions.addProject(this.state.project)
            }
            else{
                this.props.actions.updateProject(this.state.project.id, this.state.project)
            }
            this.setState({
                isAddDialogShown : false,
                project: {
                    title : '',
                    file : '',
                }
            })
        }

        this.tableFooter = <div>
            <span>
                <Button label="Add" onClick={this.addNew} icon="pi pi-plus" />
            </span>
        </div>

        this.addDialogFooter = <div>
            <Button   label="Save" icon="pi pi-save" onClick={() => this.saveProject()} />
        </div>
    }
    
    
    
    componentDidMount(){
        this.props.actions.getProjects()
    }
    
    render(){
        let {projectList} = this.props
        return <>
            <DataTable value={projectList} footer={this.tableFooter} >
                <Column header="Title" field="title" />
                <Column header="Files" field="file" />
                <Column body={this.opsTemplate} />
            </DataTable>
            {
                this.state.isAddDialogShown ?
                <Dialog visible={this.state.isAddDialogShown} header="Adaugati un proiect" onHide={this.hideAddDialog} footer={this.addDialogFooter} >
                     <InputText onChange={(e) => this.updateProperty('title', e.target.value)} value={this.state.project.title} name="title" placeholder="title" />
                    <InputText onChange={(e) => this.updateProperty('file', e.target.value)} value={this.state.project.file} name="file" placeholder="file" />
                </Dialog> 
                :
                null
            }
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditor)