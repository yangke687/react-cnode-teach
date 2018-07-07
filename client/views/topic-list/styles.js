export const topicPrimaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    textDecoration: 'none',
    color: '#555',
  },
  tab: {
    backgroundColor: theme.palette.primary[500],
    textAlign: 'center',
    display: 'inline-block',
    padding: '0 6px',
    color: '#fff',
    borderRadius: 3,
    marginRight: 10,
    fontSize: '12px',
    flexShrink: 0,
  },
  good: {
    backgroundColor: theme.palette.secondary[600],
  },
  top: {
    backgroundColor: theme.palette.secondary[200],
  },
})

export const topicSecondaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
    flexWrap: 'wrap',
  },
  count: {
    display: 'inline-block',
    textAlign: 'center',
    marginRight: 20,
  },
  userName: {
    marginRight: 20,
    color: '#9e9e9e',
  },
  accentColor: {
    color: theme.palette.secondary[500],
  },
})

export const topicListStyle = () => ({
  root: {
    margin: 24,
    marginTop: 80,
  },
  loading: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})
