/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import dotProp from "dot-prop";
import { Context } from "../classes";

function createAuthParam({ context }: { context: Context }) {
    const param: { isAuthenticated: boolean; roles?: string[]; jwt: any } = {
        isAuthenticated: false,
        roles: [],
        jwt: {},
    };

    try {
        const jwt = context.getJWT();

        if (!jwt) {
            return param;
        }

        const dotPropKey = process.env.JWT_ROLES_OBJECT_PATH;

        if (dotPropKey) {
            param.roles = dotProp.get(jwt, dotPropKey);
        } else if (jwt.roles) {
            param.roles = jwt.roles;
        }

        param.jwt = jwt;
    } catch (error) {
        return param;
    }

    param.isAuthenticated = true;

    return param;
}

export default createAuthParam;
