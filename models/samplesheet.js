module.exports = function(sequelize, DataTypes) {

    var SampleSheet = sequelize.define("SampleSheet", {

        SampleNumber: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        SampleName: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        ScientistInitials: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        Genome: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        AdapterName: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        AdapterSequence: {
            type: DataTypes.STRING,
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

        ExperimentType: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },

        DateRan: {
            type: DataTypes.DATEONLY
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

    }, {
        classMethods: {
            associate: function(models) {

                this.belongsTo(models.NextSeq, {
                    foreignKey: {
                        name: 'nextseq_id',
                        allowNull: false
                    }
                });
            }
        }

    });

    return SampleSheet;

};
