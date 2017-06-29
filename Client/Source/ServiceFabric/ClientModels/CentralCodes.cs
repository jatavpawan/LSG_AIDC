﻿


// ------------------------------------------------------------------------------------------------
// This code was generated by EntityFramework Reverse POCO Generator (http://www.reversepoco.com/).
// Created by Simon Hughes (https://about.me/simon.hughes).
// 
// Do not make changes directly to this file - edit the template instead.
// 
// The following connection settings were used to generate this file:
//     Configuration file:					"ClientModels\app.config"
//     Connection String Name:				"CentralCodeEntities"
//     Connection String:					"data source=dev-SQL-CentralCodes;initial catalog=CentralCodes;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"
//	  CentralCodesApplicationName:			"TransactCore"
//	  CentralCodesAssociationNames:			""
//	  CentralCodesDynamicEnumFilterInclude: ""
//	  CentralCodesEnumFilterExclude:		""
//	  CentralCodesTableFilterInclude:		""
//	  CentralCodesTableFilterExclude:		""
// ------------------------------------------------------------------------------------------------
// Database Edition       : Developer Edition (64-bit)
// Database Engine Edition: Enterprise

// <auto-generated>
// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.5.1
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning

namespace FCSAmerica.Transact.Client.Models
{
    using FCSAmerica.CentralCodes;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

		// ************************************************************************
		// CentralCodesManager
		// ************************************************************************

		public class CentralCodesManager : FCSAmerica.CentralCodes.ICodesManager
		{
			private readonly string _baseUri;
			private readonly FCSAmerica.CentralCodes.CentralCodesServiceAgent _svc;

			public CentralCodesManager(string baseUri)
			{
				_baseUri = baseUri;
				_svc =  new FCSAmerica.CentralCodes.CentralCodesServiceAgent(_baseUri);
			}

			public List<T> GetActiveList<T>() where T : CentralCodesEntity
			{
				return _svc.GetActiveList<T>();
			}

			public T GetByEnum<T>(int enumValue) where T : CentralCodesEntity
			{
				return _svc.GetByEnum<T>(enumValue);
			}

			public T GetById<T>(int id) where T : CentralCodesEntity
			{
				return _svc.GetById<T>(id);
			}

			public T GetByNameLong<T>(string nameLong) where T : CentralCodesEntity
			{
				return _svc.GetByNameLong<T>(nameLong);
			}

			public T GetByNameMicro<T>(string nameMicro) where T : CentralCodesEntity
			{
				return _svc.GetByNameMicro<T>(nameMicro);
			}

			public T GetByNameShort<T>(string nameShort) where T : CentralCodesEntity
			{
				return _svc.GetByNameShort<T>(nameShort);
			}

			public TEnum? GetEnumById<T, TEnum>(int id)
				where T : CentralCodesEntity
				where TEnum : struct, IComparable, IConvertible, IFormattable
			{
				return _svc.GetEnumById<T, TEnum>(id);
			}

			public int GetIdByEnum<T>(int enumValue) where T : CentralCodesEntity
			{
				return _svc.GetIdByEnum<T>(enumValue);
			}

			public List<T> GetList<T>() where T : CentralCodesEntity
			{
				return _svc.GetList<T>();
			}

			public OptionListDto GetOptions<T>() where T : CentralCodesEntity
			{
				return _svc.GetOptions<T>();
			}
		}
		
    // ************************************************************************
    // POCO classes

    // LoanAccountingSystem
    [Description("LoanAccountingSystem")]
    public partial class CodesStatic_LoanAccountingSystem : CentralCodesEntity
    {
        public override bool IsApplicationActive { get { return true; } }
        public override int Id { get { return LoanAccountingSystemId; } }
        public int LoanAccountingSystemId { get; set; } // LoanAccountingSystem_ID (Primary key)
        public string CreatedBy { get; set; } // CreatedBy
        public System.DateTime CreatedOn { get; set; } // CreatedOn
        public string UpdatedBy { get; set; } // UpdatedBy
        public System.DateTime UpdatedOn { get; set; } // UpdatedOn
        public override string NameMicro { get; set; }
        public override string NameShort { get; set; }
        public override string NameLong { get; set; }
        public override int? EnumValue { get; set; }
        public string EnumText { get; set; } // EnumText
        public System.DateTime StartingOn { get; set; } // StartingOn
        public System.DateTime? EndingOn { get; set; } // EndingOn
        public bool Deleted { get; set; } // Deleted
        public override int? CodeStatus { get; set; }
        public override int? SortOrder { get; set; }
        public string LoanAccountingSystem { get; set; } // LoanAccountingSystem
        
        public CodesStatic_LoanAccountingSystem()
        {
            CreatedBy = "suser_sname()";
            CreatedOn = System.DateTime.Now;
            UpdatedBy = "suser_sname()";
            UpdatedOn = System.DateTime.Now;
            Deleted = false;
            InitializePartial();
        }

        partial void InitializePartial();
    }

    // TransactionStatus
    [Description("TransactionStatus")]
    public partial class CodesStatic_TransactionStatus : CentralCodesEntity
    {
        public override bool IsApplicationActive { get { return true; } }
        public override int Id { get { return TransactionStatusId; } }
        public int TransactionStatusId { get; set; } // TransactionStatus_ID (Primary key)
        public string CreatedBy { get; set; } // CreatedBy
        public System.DateTime CreatedOn { get; set; } // CreatedOn
        public string UpdatedBy { get; set; } // UpdatedBy
        public System.DateTime UpdatedOn { get; set; } // UpdatedOn
        public override string NameMicro { get; set; }
        public override string NameShort { get; set; }
        public override string NameLong { get; set; }
        public override int? EnumValue { get; set; }
        public string EnumText { get; set; } // EnumText
        public System.DateTime StartingOn { get; set; } // StartingOn
        public System.DateTime? EndingOn { get; set; } // EndingOn
        public bool Deleted { get; set; } // Deleted
        public override int? CodeStatus { get; set; }
        public override int? SortOrder { get; set; }
        public string LegacySv { get; set; } // LegacySV
        
        public CodesStatic_TransactionStatus()
        {
            CreatedBy = "suser_sname()";
            CreatedOn = System.DateTime.Now;
            UpdatedBy = "suser_sname()";
            UpdatedOn = System.DateTime.Now;
            Deleted = false;
            InitializePartial();
        }

        partial void InitializePartial();
    }


    // ************************************************************************
    // POCO Configuration

    // LoanAccountingSystem
    public partial class CodesStatic_LoanAccountingSystemConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<CodesStatic_LoanAccountingSystem>
    {
        public CodesStatic_LoanAccountingSystemConfiguration()
            : this("CodesStatic")
        {
        }
 
        public CodesStatic_LoanAccountingSystemConfiguration(string schema)
        {
            ToTable(schema + ".LoanAccountingSystem");
            HasKey(x => x.LoanAccountingSystemId);

            Property(x => x.LoanAccountingSystemId).HasColumnName("LoanAccountingSystem_ID").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.CreatedBy).HasColumnName("CreatedBy").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            Property(x => x.CreatedOn).HasColumnName("CreatedOn").IsRequired().HasColumnType("datetime");
            Property(x => x.UpdatedBy).HasColumnName("UpdatedBy").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            Property(x => x.UpdatedOn).HasColumnName("UpdatedOn").IsRequired().HasColumnType("datetime");
            Property(x => x.NameMicro).HasColumnName("NameMicro").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(10);
            Property(x => x.NameShort).HasColumnName("NameShort").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            Property(x => x.NameLong).HasColumnName("NameLong").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(500);
            Property(x => x.EnumValue).HasColumnName("EnumValue").IsOptional().HasColumnType("int");
            Property(x => x.EnumText).HasColumnName("EnumText").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(100);
            Property(x => x.StartingOn).HasColumnName("StartingOn").IsRequired().HasColumnType("datetime");
            Property(x => x.EndingOn).HasColumnName("EndingOn").IsOptional().HasColumnType("datetime");
            Property(x => x.Deleted).HasColumnName("Deleted").IsRequired().HasColumnType("bit");
            Property(x => x.CodeStatus).HasColumnName("CodeStatus").IsOptional().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Computed);
            Property(x => x.SortOrder).HasColumnName("SortOrder").IsOptional().HasColumnType("int");
            Property(x => x.LoanAccountingSystem).HasColumnName("LoanAccountingSystem").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(10);

            InitializePartial();
        }
        partial void InitializePartial();
    }

    // TransactionStatus
    public partial class CodesStatic_TransactionStatusConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<CodesStatic_TransactionStatus>
    {
        public CodesStatic_TransactionStatusConfiguration()
            : this("CodesStatic")
        {
        }
 
        public CodesStatic_TransactionStatusConfiguration(string schema)
        {
            ToTable(schema + ".TransactionStatus");
            HasKey(x => x.TransactionStatusId);

            Property(x => x.TransactionStatusId).HasColumnName("TransactionStatus_ID").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.CreatedBy).HasColumnName("CreatedBy").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            Property(x => x.CreatedOn).HasColumnName("CreatedOn").IsRequired().HasColumnType("datetime");
            Property(x => x.UpdatedBy).HasColumnName("UpdatedBy").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            Property(x => x.UpdatedOn).HasColumnName("UpdatedOn").IsRequired().HasColumnType("datetime");
            Property(x => x.NameMicro).HasColumnName("NameMicro").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(10);
            Property(x => x.NameShort).HasColumnName("NameShort").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            Property(x => x.NameLong).HasColumnName("NameLong").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(500);
            Property(x => x.EnumValue).HasColumnName("EnumValue").IsOptional().HasColumnType("int");
            Property(x => x.EnumText).HasColumnName("EnumText").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(100);
            Property(x => x.StartingOn).HasColumnName("StartingOn").IsRequired().HasColumnType("datetime");
            Property(x => x.EndingOn).HasColumnName("EndingOn").IsOptional().HasColumnType("datetime");
            Property(x => x.Deleted).HasColumnName("Deleted").IsRequired().HasColumnType("bit");
            Property(x => x.CodeStatus).HasColumnName("CodeStatus").IsOptional().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Computed);
            Property(x => x.SortOrder).HasColumnName("SortOrder").IsOptional().HasColumnType("int");
            Property(x => x.LegacySv).HasColumnName("LegacySV").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);

            InitializePartial();
        }
        partial void InitializePartial();
    }

}
namespace FCSAmerica.CentralCodes.Constants
{
	public enum TransactionStatus
	{
		Staged = 1,
		ReadyForLiq = 2,
		SentToLiq = 3,
		ReadyForSds = 4,
		ProcessedByLiq = 5,
		Retry = 6,
		Failed = 7,
		TransferredToSds = 8,
		DefaultedToGeneralLedger = 9,
		FailedByLiq = 10,
		NotEligibleForProcessing = 11,
		FailedBeforeLiq = 12,
		PartialSuccessInLiq = 13,
		EmployeeTransaction = 14,
		ReadyForLas = 15,
	}
}
// </auto-generated>
