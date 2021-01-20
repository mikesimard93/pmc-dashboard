import Tree from 'react-tree-graph';
import React from "react";
import './App.css';

let data = {
    name: 'Parent',
    children: [{
        name: 'Banc de test fonctionnel',
        children: [{
            name: 'Child One',
            textProps: {x: -25, y: 25},
        }, {
            name: 'Child Two',
            children: [{
                name: 'Child One',
                children: [{
                    name: 'Child One',
                    color: 'yellow'
                }, {
                    name: 'Child Two',
                    children: [{
                        name: 'Child One'
                    }, {
                        name: 'Yellow',
                        pathProps: {className: 'yellow'},
                        textProps: {x: -25, y: 25},
                        color: 'yellow',
                        children: []
                    }]
                }]
            }, {
                name: 'Child Two'
            }]
        }]
    }, {
        name: 'Child Two',
        children: [{
            name: 'Child One'
        }, {
            name: 'Child Two',
            children: [{
                name: 'Child One'
            }, {
                name: 'Child Two'
            }]
        }]
    }]
};


class MindMap extends React.Component {

    render() {
        return (

            <Tree
                data={data}
                nodeRadius={30}
                height={400}
                width={1500}/>
        );
    }
}

export default MindMap;