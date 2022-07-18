import React from 'react';
import _ from 'lodash';

export default function Button(props) {
    let classProp = (_.has(props, "className")) ? props.className : "";
    let newType = (_.has(props, "as")) ? props.as : null;
    let newProps = _.cloneDeep(props);
    _.unset(newProps, "className");
    _.unset(newProps, "as");

    if (_.has(newProps, "color")) {
        switch(newProps.color) {
            case "red": classProp += " bg-gradient-to-b from-red-100 to-red-400 hover:from-white hover:to-red-300"; break;
            case "green": classProp += " bg-gradient-to-b from-emerald-100 to-emerald-400 hover:from-white hover:to-emerald-300"; break;
            case "blue": classProp += " bg-gradient-to-b from-blue-100 to-blue-400 hover:from-white hover:to-blue-300"; break;
            case "gray": classProp += " bg-gradient-to-b from-gray-100 to-gray-400 hover:from-white hover:to-gray-300"; break;
            case "yellow": classProp += " bg-gradient-to-b from-amber-100 to-amber-400 hover:from-white hover:to-amber-300"; break;
            case "purple": classProp += " bg-gradient-to-b from-purple-100 to-purple-400 hover:from-white hover:to-purple-300"; break;
            case "white": classProp += " bg-gradient-to-b from-white to-gray-300 hover:from-gray-100 hover:to-gray-400"; break;
            case "disabled": classProp += " bg-gradient-to-b from-gray-100 to-gray-400 text-gray-600"; break;
            default: classProp += " bg-gradient-to-b from-slate-100 to-slate-400 hover:from-white hover:to-slate-300";
        }
    }
    else {
        classProp += " bg-gradient-to-b from-slate-100 to-slate-400 hover:from-white hover:to-slate-300";
    }

    if (newType != null) {
        return React.createElement(newType, {...newProps, className:classProp + " px-2 py-1 rounded-xl border font-bold text-center"}, props.children);
    }
    else {
        return React.createElement("button", {...newProps, className:classProp + " px-2 py-1 rounded-xl border font-bold text-center"}, props.children);
    }
}