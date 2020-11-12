import React from 'react'
import p from 'prop-types'
import gql from 'graphql-tag'
import FormDialog from '../dialogs/FormDialog'
import { useMutation } from '@apollo/react-hooks'
import { nonFieldErrors } from '../util/errutil'

const mutation = gql`
  mutation($id: ID!) {
    deleteAll(input: [{ id: $id, type: contactMethod }])
  }
`
function UserContactMethodDeleteDialog(props) {
  const { contactMethodID, ...rest } = props

  const [deleteUserMethod, deleteMethodStatus] = useMutation(mutation, {
    variables: {
      id: contactMethodID,
    },
    onCompleted: props.onClose,
  })

  return (
    <FormDialog
      title='Are you sure?'
      confirm
      loading={deleteMethodStatus.loading}
      errors={nonFieldErrors(deleteMethodStatus.error)}
      subTitle='This will delete the contact method.'
      caption='This will also delete any notification rules associated with this contact method.'
      onSubmit={() => deleteUserMethod()}
      {...rest}
    />
  )
}

UserContactMethodDeleteDialog.propTypes = {
  contactMethodID: p.string.isRequired,
  onClose: p.func.isRequired, // passed to FormDialog
}

export default UserContactMethodDeleteDialog
