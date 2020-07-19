import React from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseActions';
import * as authorAction from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursePage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }
    componentDidMount() {
        const {courses, authors, actions} = this.props;

        //Calling action loadCourses function here
        if (courses.length === 0) {
            actions.loadCourses().catch(err => {
                alert('Load Course  fail' + err);
            });
        }

        //Calling action loadCourses function here
        if (authors.length === 0) {
            actions.loadAuthors().catch(err => {
                alert('Load Authors  fail' + err);
            });
        }
    }

    handleDeleteCourse = course => {
        toast.success('Course deleted');
        this.props.actions.deleteCourse(course).catch(error => {
            toast.error('Delete Failed', + error.message, {autoClose: false});
        });
    }
    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <>
                    <button 
                    style={{ marginBottom: 20 }}
                    className='btn btn-primary add-course'
                    onClick={() => this.setState({redirectToAddCoursePage: true})}>Add Course</button>
                    <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
                    </>
                )}
            </>
        );
    }
}
CoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function  mapStateToProps(state) {
    return {
        courses: state.authorsReducer.length === 0 
        ? []
        : state.courseReducer.map(course => {
            return {
                ...course,
                authorName: state.authorsReducer.find(a => a.id === course.authorId).name
            }
        }),
        authors: state.authorsReducer,
        loading: state.apiCallsInProgress > 0
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: {
            loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseAction.deleteCourse, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);