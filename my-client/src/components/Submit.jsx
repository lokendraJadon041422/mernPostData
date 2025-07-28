import React from 'react'
import { useNavigation } from 'react-router-dom'
const Submit = ({classNameButton}) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
  return (
    <button
            type='submit'
            className={classNameButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
  )
}

export default Submit
