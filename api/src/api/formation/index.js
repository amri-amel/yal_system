import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Formation, { schema } from "./model";

const router = new Router();
const { titre, state, duree, theme, courses, coach } = schema.tree;

/**
 * @api {post} /formations Create formation
 * @apiName CreateFormation
 * @apiGroup Formation
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam titre Formation's titre.
 * @apiParam state Formation's state.
 * @apiParam duree Formation's duree.
 * @apiParam theme Formation's theme.
 * @apiParam courses Formation's courses.
 * @apiParam coach Formation's coach.
 * @apiSuccess {Object} formation Formation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Formation not found.
 * @apiError 401 master access only.
 */
router.post(
  "/",
  token({ required: true, roles: ["admin"] }),
  body({ titre, state, duree, theme, courses, coach }),
  create
);

/**
 * @api {get} /formations Retrieve formations
 * @apiName RetrieveFormations
 * @apiGroup Formation
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of formations.
 * @apiSuccess {Object[]} rows List of formations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get("/", query(), index);

/**
 * @api {get} /formations/:id Retrieve formation
 * @apiName RetrieveFormation
 * @apiGroup Formation
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} formation Formation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Formation not found.
 * @apiError 401 master access only.
 */
router.get("/:id", show);

/**
 * @api {put} /formations/:id Update formation
 * @apiName UpdateFormation
 * @apiGroup Formation
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam titre Formation's titre.
 * @apiParam state Formation's state.
 * @apiParam duree Formation's duree.
 * @apiParam theme Formation's theme.
 * @apiParam courses Formation's courses array.
 * @apiSuccess {Object} formation Formation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Formation not found.
 * @apiError 401 master access only.
 */
router.put("/:id", 
token({ required: true, roles: ['admin'] }), 
body({ titre,  duree, theme, courses, coach }), update);

/**
 * @api {delete} /formations/:id Delete formation
 * @apiName DeleteFormation
 * @apiGroup Formation
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Formation not found.
 * @apiError 401 master access only.
 */
router.delete("/:id",  token({ required: true, roles: ['admin'] }),destroy);

export default router;
