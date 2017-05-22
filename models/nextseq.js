module.exports = function(sequelize, DataTypes) {

    var NextSeq = sequelize.define("NextSeq", {

        NextSeqRuns: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        ProjectName: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        DateRan: {
            type: DataTypes.DATEONLY
        },

        Lab: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        MultipleProjects: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
            set: function(value) {
                if (value === 'TRUE') value = true;
                if (value === 'FALSE') value = false;
                this.setDataValue('MultipleProjects', value);
            }
        },

        MultipleRuns: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
            set: function(value) {
                if (value === 'TRUE') value = true;
                if (value === 'FALSE') value = false;
                this.setDataValue('MultipleRuns', value);
            }
        },

        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt',
            defaultValue: sequelize.literal('NOW()')
        },

        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt',
            defaultValue: sequelize.literal('NOW()')
        }

        // }, {
        //     classMethods: {
        //         associate: function(models) {
        //             this.belongsTo(models.User, {
        //                 foreignKey: {
        //                     name: 'owner_id',
        //                     allowNull: false
        //                 }
        //             });


        //             this.belongsTo(models.User, {
        //                 foreignKey: {
        //                     name: 'user_id',
        //                     allowNull: false
        //                 }
        //             });

        //             this.belongsTo(models.Category, {
        //                 foreignKey: {
        //                     name: 'category_id',
        //                     allowNull: false
        //                 }
        //             });
        //         }
        //     }
    });

    return NextSeq;

};
