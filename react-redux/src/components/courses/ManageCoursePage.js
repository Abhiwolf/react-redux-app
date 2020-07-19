import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

 function ManageCoursePage({courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
     const [course, setCourse] = useState({...props.course})
     // eslint-disable-next-line no-unused-vars
     const [errors, setErrors] = useState({});
     const [saving, setSaving] = useState(false);
    useEffect(() => {
        //Calling action loadCourses function here
        if (courses.length === 0) {
            loadCourses().catch(err => {
                alert('Load Course  fail' + err);
            });
        } else {
            setCourse({...props.course});
        }

        //Calling action loadCourses function here
        if (authors.length === 0) {
            loadAuthors().catch(err => {
                alert('Load Authors  fail' + err);
            });
        }
    }, [props.course]);
    function handleChange(event){
        const { name, value } = event.target;
        setCourse( prevCourse => (
            {...prevCourse, [name]: name ==='authorId' ? parseInt(value, 10) : value}
        ));
    }
    function formIsValid() {
        const {title, authorId, category } = course;
        const errors = {};
        if (!title) errors.title = 'Title is required.';
        if (!authorId) errors.authorId = 'AuthorId is required.';
        if (!category) errors.category = 'Category is required.';

        setErrors(errors);
        return Object.keys(errors).length === 0;

    }
    function handleSave(event){
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success('Course saved');
            history.push('/courses');
        }).catch(err => {
            setSaving(false);
            setErrors({
                onSave: err.message
            })
        });
    }
    return authors.length === 0 || courses.length === 0 ? (
        <Spinner />
    ) : (
       <CourseForm 
       course={course} 
       errors={errors} 
       authors={authors}
       onChange={handleChange}
       onSave={handleSave}
       saving={saving}
    />
    );
}
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug){
    return courses.find(course => course.slug === slug) || null;
}
function  mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug; //accessing url params
    const course = slug && state.courseReducer.length > 0  ? getCourseBySlug(state.courseReducer, slug): newCourse;
    return {
        course,
        courses: state.courseReducer,
        authors: state.authorsReducer
    }
}
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);