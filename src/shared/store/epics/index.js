import trivials from './trivials';
import queries from './queries';
import * as globals from './globals';
import * as recipeField from './recipeField';

export default [...queries, ...trivials, ...Object.values(recipeField), ...Object.values(globals)];
