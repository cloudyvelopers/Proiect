import {SERVER} from '../config/global'
const fetch = require('node-fetch');
export const GET_PROJECTS='GET_PROJECTS'
export const ADD_PROJECT='ADD_PROJECT'
export const UPDATE_PROJECT='UPDATE_PROJECT'
export const DELETE_PROJECT='DELETE_PROJECT'

export function getProjects() {
    return {
      type: GET_PROJECTS,
      payload: async () => {
          let response  = await fetch(`${SERVER}/projects`)
          let json = await response.json()
          return json
      }
    }
}

export function addProject(project){
    return {
      type : ADD_PROJECT,
      payload : async () => {
          await fetch(`${SERVER}/projects`, {
              method : 'post',
              headers : {
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify(project)
          })
          let response  = await fetch(`${SERVER}/projects`)
          let json = await response.json()
          return json
      }
    }
  }

  export function updateProject(projectId, project){
    return {
        type : UPDATE_PROJECT,
        payload : async () => {
            await fetch(`${SERVER}/projects/${projectId}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(project)
            })
            let response  = await fetch(`${SERVER}/projects`)
            let json = await response.json()
            return json
        }
    }
}

export function deleteProject(projectId){
    return {
        type : DELETE_PROJECT,
        payload : async () => {
            await fetch(`${SERVER}/projects/${projectId}`, {
                method : 'delete'
            })
            let response  = await fetch(`${SERVER}/projects`)
            let json = await response.json()
            return json
        }
    }
}