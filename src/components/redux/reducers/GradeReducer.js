const GradeReducer = (state = [], action) => {
    if (action.type === 'SET_GRADES') {
        return action.grades
    } else {
        return state
    }
};

export default GradeReducer;
