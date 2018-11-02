import Demo from '../pages/demo';
<%- routes.importStr %>

export default routes = {
    Demo: { screen: Demo },
    <%- routes.routeItem %>
}